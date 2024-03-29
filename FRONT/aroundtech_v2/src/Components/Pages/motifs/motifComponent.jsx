import { useEffect, useState, useRef } from "react";
import { Table, Button } from 'react-bootstrap';

import ModalRootComponent from '../../Modules/modals/modalRootComponent';
import ModalChildEditComponent from '../../Modules/modals/modalChildEditMotifComponent';
import ModalChildDeleteComponent from '../../Modules/modals/modalChildDelete';

import NatureExpService from '../../../Services/MotifService';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useUser } from '../../../Contexts/UserContext';
import { Error, Loading } from '../../Modules/loadingError/loadingErrorComponent';

import Utils from '../../../Utils/utils';
import "./motifs.css";


export default function MotifComponent(props) {

    //// Setters && Getters for display
    const [lstNaturesExp, setLstNaturesExp] = useState([]);
    const [refreshDisplay, setRefreshDisplay] = useState(false);


    // Utilisation du hook useUser
    const contextUser = useUser();
    const loading = contextUser.loading;
    const error = contextUser.error;


    ////  Setters && Getters for modals
    const [isEditBtnDisabled, setIsEditBtnDisabled] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [modalChild, setModalChild] = useState(<></>);
    const [modalTitle, setModalTitle] = useState("");
    const [modalType, setModalType] = useState('');
    const [modalBtnLabel, setModalBtnLabel] = useState('');
    const [modalMotif, setModalMotif] = useState(null);

    const inputNameEdit = useRef(null);
    const inputIsCapEdit = useRef(null);
    const inputMaxCapEdit = useRef(null);




    useEffect(() => {
        (async () => {
            if (contextUser?.user?.id && (contextUser?.user?.role.id === 3|| contextUser?.user?.role.id === 2) ) {

                const dataNatures = await NatureExpService.loadNaturesExp();
                setLstNaturesExp(dataNatures);
            }
        })()

    }, [contextUser.user, refreshDisplay]);

    // Gérer l'état de chargement
    if (loading) {
        return <Loading />;
    }

/*     // Gérer l'état d'erreur
    if (error) {
        return <Error />;
    }
 */

    ////  Reset Modal
    const handleResetModal = (isRefresh) => {

        setModalShow(false);
        setModalChild(<></>);
        setModalTitle("");
        setModalBtnLabel("");
        setIsEditBtnDisabled(true);
        setModalType(<></>);
        setModalMotif(null);

        if (isRefresh) {
            setRefreshDisplay(!refreshDisplay);
        }

    }

    const handleModalClick = (event) => {

        if (modalType === 'add') {
            onClickAddMotif(event);
        } else if (modalType === 'update') {
            onClickUpdateMotif(event);
        } else if (modalType === 'delete') {
            onClickDeleteMotif(event);
        }
    }

    //// ADD Motif
    async function onClickAddMotif(event) {

        event.preventDefault();

        if (inputNameEdit.current && inputIsCapEdit.current && inputMaxCapEdit.current) {

            let amount = 0;

            if (inputIsCapEdit.current.checked) {
                amount = parseFloat(inputMaxCapEdit.current.value).toFixed(2);
            }


            let natExpense = {
                "name": inputNameEdit.current.value,
                "capped": inputIsCapEdit.current.checked,
                "valCap": amount
            }

            const response = await NatureExpService.addNatExpense(natExpense, contextUser.user.id);

            if (response === true) {

                inputNameEdit.current.value = "";
                inputNameEdit.current.focus();

                inputIsCapEdit.current.value = "";
                inputIsCapEdit.current.focus();

                inputMaxCapEdit.current.value = "";
                inputMaxCapEdit.current.focus();

                handleResetModal(true);

            } else {
                alert("Erreur à la création de la nature du frais");
            } //TODO: gestion Erreur


        } else {
            console.log(`Erreur à la récupération des infos de la nature du frais!!`, event);
        }
    }

    const onClickShowModalAdd = () => {

        setModalType('add');
        setModalChild((
            <ModalChildEditComponent

                isBtnDisabled={(boolValid) => { setIsEditBtnDisabled(boolValid) }}

                inputNameEdit={inputNameEdit}
                inputIsCapEdit={inputIsCapEdit}
                inputMaxCapEdit={inputMaxCapEdit}

                lstNatures={lstNaturesExp}
            />
        ));
        setModalShow(true);
        setModalTitle("Ajouter une nature de frais");
        setModalBtnLabel("Ajouter");

    }

    //// UPDATE Motif
    async function onClickUpdateMotif(event) {

        event.preventDefault();

        if (inputNameEdit.current && inputIsCapEdit.current && inputMaxCapEdit.current) {

            let amount = 0;
            if (inputIsCapEdit.current.checked) {
                amount = parseFloat(inputMaxCapEdit.current.value).toFixed(2);
            }

            let natExpense = {
                "id": modalMotif.id,
                "name": inputNameEdit.current.value,
                "capped": inputIsCapEdit.current.checked,
                "valCap": amount
            }

            const response = await NatureExpService.updateNatExpense(natExpense, contextUser.user.id);

            if (response === true) {

                inputNameEdit.current.value = "";
                inputNameEdit.current.focus();

                inputIsCapEdit.current.value = "";
                inputIsCapEdit.current.focus();

                inputMaxCapEdit.current.value = "";
                inputMaxCapEdit.current.focus();

                handleResetModal(true);

            } else {
                alert("Erreur à la création de la nature du frais");
            } //TODO: gestion Erreur


        } else {
            console.log(`Erreur à la récupération des infos de la nature du frais!!`, event);
        }
    }

    const onClickShowModalUpdate = (motif) => {

        setModalMotif(motif)
        setModalType('update');
        setIsEditBtnDisabled(false);
        setModalChild((
            <ModalChildEditComponent

                isBtnDisabled={(boolValid) => { setIsEditBtnDisabled(boolValid) }}
                handleSubmitAdd={(event) => { onClickUpdateMotif(event) }}

                inputNameEdit={inputNameEdit}
                inputIsCapEdit={inputIsCapEdit}
                inputMaxCapEdit={inputMaxCapEdit}

                lstNatures={lstNaturesExp}

                oldValueName={motif.name}
                oldValueIsCap={motif.capped === true}
                oldValueMaxCap={motif.valCap.toFixed(2)}

                isUpdate={true}
            />
        ));
        setModalShow(true);
        setModalTitle("Modifier une nature de frais");
        setModalBtnLabel("Modifier");
    }

    //// DELETE Expense
    async function onClickDeleteMotif(event) {

        event.preventDefault();
        const res = await NatureExpService.deleteNatExpense(modalMotif.id, contextUser.user.id);

        if (!res) {
            alert("Erreur à la suppression : ", res);
        } else {
            handleResetModal(true);
        }
    }

    const onClickShowModalDelete = (motif) => {

        const lstInfosMotifToDelete = [
            {
                'label': "Nom du frais",
                'info': Utils.capitalizeFirstLetter(motif.name)
            },
            {
                'label': "Plafond",
                'info': motif.capped === true ? "Oui" : "Non"
            },
            {
                'label': "Montant du plafond (€)",
                'info': Utils.formatAmount(motif.valCap)
            },
        ];

        setModalMotif(motif)
        setModalType('delete');
        setModalShow(true);
        setModalTitle("Supprimer une nature de frais");
        setModalBtnLabel("Supprimer");
        setIsEditBtnDisabled(false);
        setModalChild((
            <ModalChildDeleteComponent
                lstInfosToDelete={lstInfosMotifToDelete}
            />
        ));

    }




    if (lstNaturesExp !== undefined) {
        return (<>
            <div id="title-cont">
                <h1>Nature de frais</h1>
            </div>


            <div className="d-flex flex-column justify-content-center my-4">
                <div className="text-center my-4 mx-4">
                    <Table responsive>

                        <thead>
                            <tr>
                                <th className="table-subtitle">Nom</th>
                                <th className="table-subtitle">Plafond</th>
                                <th className="table-subtitle">Montant du plafond(€)</th>
                                <th className="table-subtitle">Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {(lstNaturesExp === undefined || lstNaturesExp.length === 0) && (
                                <tr>
                                    <td colSpan={8} className="text-center">
                                        Aucun résultat
                                    </td>
                                </tr>
                            )}

                            {lstNaturesExp !== undefined && lstNaturesExp.length !== 0 &&
                                lstNaturesExp.map((motif) => {
                                    return (

                                        <tr key={motif.id}>
                                            <td>{Utils.capitalizeFirstLetter(motif.name)}</td>
                                            <td>{motif.capped === false ? "Non" : "Oui"}</td>
                                            <td>{Utils.formatAmount(motif.valCap) + " €"}</td>
                                            <td>

                                                <button className="button_icon button_edit">
                                                    <EditIcon className="icon_edit" onClick={() => onClickShowModalUpdate(motif)} />
                                                </button>

                                                <button className="button_icon button_delete" onClick={() => {
                                                    onClickShowModalDelete(motif)
                                                }}>

                                                    <DeleteIcon className="icon_delete" />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}

                        </tbody>

                    </Table>
                </div>
            </div>


            <section className="d-flex justify-content-center">
                <button className="button_add" onClick={() => onClickShowModalAdd()}>
                    Ajouter un frais : <AddCircleIcon />
                </button>
            </section>


            <div id="modal-add-cont">

                <ModalRootComponent
                    show={modalShow}
                    onHide={() => handleResetModal(false)}
                    title={modalTitle}
                    childmodal={modalChild}
                    footerbuttons={(
                        <>

                            <Button
                                className="btn-modal-success"
                                disabled={isEditBtnDisabled}
                                type="submit"
                                onClick={(event) => { handleModalClick(event) }}
                            >
                                {modalBtnLabel}
                            </Button>

                            <Button className="btn-modal-cancel" onClick={() => { handleResetModal(false) }}>Annuler</Button>
                        </>
                    )}

                />
            </div>
        </>)
    }



    /// not found // not
    return (<>not found ou not allowed  </>);

}