import React, { useEffect, useState, useRef } from 'react';
import { Table, Form } from 'react-bootstrap';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MissionService from '../../../Services/missionService';
import NatureService from '../../../Services/NatureService';
import Chart from 'chart.js/auto';
import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';
import { useUser } from '../../../Contexts/UserContext';
import { Error, Loading } from '../../Modules/loadingError/loadingErrorComponent';
import Utils from '../../../Utils/utils';
import "./primes.css";
import ExportsService from '../../../Services/exportsService';

export default function PrimesComponent(props) {

    // Utilisation du hook useUser
    const contextUser = useUser();
    const loading = contextUser.loading;
    const error = contextUser.error;

    //// Setters && Getters for display
    const [lstMissionsAll, setLstMissionsAll] = useState([]);
    const [lstMissionsOneYear, setLstMissionsOneYear] = useState([]);
    const [lstNatMis, setLstNatMis] = useState([]);

    const [lstYears, setLstYears] = useState([]);
    const [yearValue, setYearValue] = useState("");
    const [chart, setChart] = useState(null);

    const inputYear = useRef(null);
    const inputGraph = useRef(null);


    useEffect(() => {

        (async () => {
            if (contextUser?.user?.id) {
                let dataMissionsAll = await MissionService.loadMissionsByUser(contextUser.user.id);
                //dataMissionsAll = dataMissionsAll.filter(mis => new Date(mis.endDate) < new Date())
                setLstMissionsAll(dataMissionsAll);

                const dataNatMis = await NatureService.loadNaturesMis();
                setLstNatMis(dataNatMis);

                const dataLstYears = dataMissionsAll.map(mis => new Date(mis.endDate).getFullYear()).filter((year, index, self) => self.indexOf(year) === index);
                setLstYears(dataLstYears);
            }
        })();
    }, [contextUser.user]);

    // Gérer l'état de chargement
    if (loading) {
        return <Loading />;
    }

    // Gérer l'état d'erreur
    if (error) {
        return <Error />;
    }


    //// Gestion Grap event
    const onClickChangeYear = (event) => {

        event.preventDefault();

        if (chart) {
            chart.destroy();
        }

        if (inputYear.current != null) {

            const lstMissionBySelectedYear = lstMissionsAll.filter(mis => new Date(mis.endDate).getFullYear().toString(10) === inputYear.current.value);
            setLstMissionsOneYear(lstMissionBySelectedYear);


            let dataGraph = [];

            const lstMonths = Array.from({ length: 12 }, (_, i) => format(new Date(2023, i, 1), 'MMMM', { locale: fr }));
            lstMonths.forEach(month => {

                let dataMonth = {
                    "month": month,
                    "prime": 0
                }

                lstMissionBySelectedYear.filter(mis => format(new Date(2023, new Date(mis.endDate).getMonth(), 1), 'MMMM', { locale: fr }) === month)
                    .forEach(mis => {

                        // Get prime
                        const nature = lstNatMis.find(nat => nat.id === mis.natureInit.id);
                        dataMonth.prime += Utils.getPrime(mis, nature);

                    });

                dataGraph.push(dataMonth);
            });

            setGraph(inputYear.current.value, dataGraph);

        }
    }
    //// Gestion Graph asset
    const setGraph = (year, dataGraph) => {

        const ctx = inputGraph.current.getContext('2d');
        const graph = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dataGraph.map(data => data.month),
                datasets: [
                    {
                        label: 'Primes année ' + year,
                        data: dataGraph.map(data => data.prime),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        setChart(graph);
    }
    //// Gestion Export xls
    const onClickExport = async () => {

        let jsonToExport = lstMissionsOneYear.map(mis => {
            const nature = lstNatMis.find(nat => nat.id === mis.natureInit.id);
            return {
                "Date de début": Utils.formatDateTimestampToStr(mis.startDate),
                "Date de fin": Utils.formatDateTimestampToStr(mis.endDate),
                "Nature": Utils.capitalizeFirstLetter(nature.name),
                "Prime (€)": Utils.getPrime(mis, nature)
            }
        });

        await ExportsService.exportPrimeToXls(contextUser.user.id, jsonToExport);
    }


    return (
        <>
            <div>
                <h1>Récapitulatif des primes <i className="bi bi-filetype-xls"></i></h1>
            </div>

            <div id="infos-primes-cont">

                <Form>
                    <Form.Label>Année</Form.Label>
                    <Form.Select
                        className='form-data'
                        ref={inputYear}
                        value={yearValue === undefined ? "" : yearValue}
                        onChange={(e) => {
                            setYearValue(e.target.value);
                            onClickChangeYear(e);
                        }}
                    >

                        <option value=""></option>

                        {lstYears.map((year) => {
                            return (<option key={year}>{year}</option>);
                        })}

                    </Form.Select>
                </Form>
                <button
                    disabled={!(yearValue !== undefined && yearValue !== "")}
                    className='button_add'
                    onClick={() => { onClickExport() }}>
                    <FileDownloadIcon />
                </button>

            </div>


            <div id="data-primes-cont">
                <div className="d-flex flex-column justify-content-center my-4">
                    <div className="text-center my-4 mx-4">
                        <Table responsive>

                            <thead>
                                <tr>
                                    <th className="table-subtitle">Date de Début</th>
                                    <th className="table-subtitle">Date de fin</th>
                                    <th className="table-subtitle">Nature</th>
                                    <th className="table-subtitle">Prime (€)</th>
                                </tr>
                            </thead>

                            <tbody>

                                {(lstMissionsOneYear === undefined) || (lstMissionsOneYear.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="text-center">
                                            Sélectionner une année
                                        </td>
                                    </tr>
                                ))}

                                {lstMissionsOneYear !== undefined && lstMissionsOneYear.length !== 0 && yearValue !== "" &&

                                    lstMissionsOneYear.map(mis => {
                                        const nature = lstNatMis.find(nat => nat.id === mis.natureInit.id);
                                        return (
                                            <tr key={mis.id}>
                                                <td>{Utils.formatDateTimestampToStr(mis.startDate)}</td>
                                                <td>{Utils.formatDateTimestampToStr(mis.endDate)}</td>
                                                <td>{nature !== undefined ? Utils.capitalizeFirstLetter(nature.name) : ""}</td>
                                                <td>{nature !== undefined ? Utils.getPrime(mis, nature) : -1}</td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </Table>
                    </div>
                </div>

                <div id="chart">
                    <canvas ref={inputGraph} id="graph" />
                </div>
            </div>
        </>
    );
}