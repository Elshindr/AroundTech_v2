import React, { useEffect, useState, useRef } from 'react';
import { Table, Button } from 'react-bootstrap';
import { NavLink, useParams, useNavigate} from 'react-router-dom'

import ModalRootComponent from '../modals/modalRootComponent';
import ModalChildEditComponent from '../modals/modalChildEditExpenseComponent';
import ModalChildDeleteComponent from '../modals/modalChildDelete';
import ModalChildValidExpenseComponent from '../modals/modalChildValidExpenseComponent';

import MissionService from '../../Services/missionService';
import ExpenseService from '../../Services/ExpenseService';
import NatureExpService from '../../Services/MotifService';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';

import { useUser } from '../../Contexts/UserContext';
import { Error, Loading } from '../loadingError/loadingErrorComponent';


import Utils from '../../Utils/utils';
import "./expense.css";

export default function ExpenseSaisieComponent() {

    //// Setters && Getters for display
    const [aMission, setAMission] = useState({});
    const [aNatMisInit, setANatMisInit] = useState({});
    const [lstExpenses, setLstExpenses] = useState([]);
    const [refreshDisplay, setRefreshDisplay] = useState(false);
    const [infosPrime, setInfosPrime] = useState({});


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
    const [modalExpense, setModalExpense] = useState(null);

    const inputDateEdit = useRef(null);
    const inputNatExpEdit = useRef(null);
    const inputAmountEdit = useRef(null);


    ////  Props && Globals
    const { idMission } = useParams();
    const router = useNavigate();


    useEffect(() => {
        (async () => {
            if (contextUser.user) {

                const dataMission = await MissionService.loadOneMission(contextUser.user.id, idMission);
                setAMission(dataMission);

                if (dataMission) {
                    const dataNatMisInit = dataMission.natureInit;
                    setANatMisInit(dataNatMisInit);

                    const dataExpenses = await ExpenseService.loadExpensesFromOneMission(contextUser.user.id, idMission);
                    setLstExpenses(dataExpenses);

                    const dataNatures = await NatureExpService.loadNaturesExp();

                    if(dataNatures){
                        const dataPrime = validExpenses(dataNatures, dataExpenses, dataMission, dataNatMisInit);
                        setInfosPrime(dataPrime);
                    }


                } else{
                    // Redirige vers la page de gestion des dépenses
                    console.log(`connnard !!!!!!!!!!!!!!!!!!!!!!!!!!!`)
                   // router(`/expenses`, { replace: true });
                }
            }
        })();

    }, [contextUser.user, refreshDisplay]);

    // Gérer l'état de chargement
    if (loading) {
        console.log(`loading in saisiExpense`, loading)
        return <Loading />;
    }

/*     // Gérer l'état d'erreur
    if (error) {
        console.log(`error in saisiExpense`, error)
        return <Error />;
    }  */

    ////  Reset Modal
    const handleResetModal = (isRefresh) => {

        setModalShow(false);
        setModalChild(<></>);
        setModalTitle("");
        setModalBtnLabel("");
        setIsEditBtnDisabled(true);
        setModalType(<></>);
        setModalExpense(null);

        if (isRefresh) {
            setRefreshDisplay(!refreshDisplay);
        }

    }

    const handleModalClick = (event) => {

        if (modalType === 'add') {
            onClickAddExpense(event);
        } else if (modalType === 'update') {
            onClickUpdateExpense(event);
        } else if (modalType === 'delete') {
            onClickDeleteExp(event);
        } else if (modalType === 'valid') {
            onClickValidExpenses(event);
        }
    }


    //// ADD Expense
    async function onClickAddExpense(event) {

        event.preventDefault();
        //console.log(`inputNatExpEdit.current`, inputNatExpEdit.current)
        if (inputDateEdit.current && inputNatExpEdit.current && inputAmountEdit) {

            const selectedIndexNatExp = inputNatExpEdit.current.selectedIndex;
           // console.log(`inputDateEdit.current.value`,inputDateEdit.current.value)
            let idNat = 0
            if (selectedIndexNatExp !== 0) {
                idNat = inputNatExpEdit.current[selectedIndexNatExp].id;
            }

            const response = await ExpenseService.addExpense(Utils.formatDateStrToTimestamp(inputDateEdit.current.value), idNat, inputAmountEdit.current.value, idMission);

            if (response === true) {

                inputDateEdit.current.value = "";
                inputDateEdit.current.focus();

                inputNatExpEdit.current.value = "";
                inputNatExpEdit.current.focus();

                inputAmountEdit.current.value = "";
                inputAmountEdit.current.focus();

                handleResetModal(true);

            } else {
                alert("Erreur à la création de la note");
            } //TODO: gestion Erreur


        } else {
            console.log(`Erreur à la récupération des infos de la note de frais!!`, event);
        }
    }

    const onClickShowModalAdd = () => {

        setModalType('add');
        setModalChild((
            <ModalChildEditComponent

                isBtnDisabled={(boolValid) => { setIsEditBtnDisabled(boolValid) }}

                inputDateEdit={inputDateEdit}
                inputNatExpEdit={inputNatExpEdit}
                inputAmountEdit={inputAmountEdit}

                dateValue={Utils.formatDateToISO(aMission.startDate)}
                maxDate={Utils.formatDateToISO(aMission.endDate)}
                minDate={Utils.formatDateToISO(aMission.startDate)}

                lstExpenses={lstExpenses}
            />
        ));
        setModalShow(true);
        setModalTitle("Ajouter un frais");
        setModalBtnLabel("Ajouter");

    }


    //// UPDATE Expense 
    async function onClickUpdateExpense(event) {

        event.preventDefault();

        const selectedIndexNatExp = inputNatExpEdit.current.selectedIndex;
        let idNat = 0
        if (selectedIndexNatExp !== 0) {
            if (selectedIndexNatExp !== 0) {
                idNat = inputNatExpEdit.current[selectedIndexNatExp].id;
            }
        }

        if (inputDateEdit.current && inputNatExpEdit.current && inputAmountEdit && idNat !== 0 && modalExpense.id !== undefined) {

            const response = await ExpenseService.updateOneExpense(Utils.formatDateStrToTimestamp(inputDateEdit.current.value), idNat, inputAmountEdit.current.value, modalExpense.id, modalExpense.validAt);

            if (response === true) {

                inputDateEdit.current.value = "";
                inputDateEdit.current.focus();

                inputNatExpEdit.current.value = "";
                inputNatExpEdit.current.focus();

                inputAmountEdit.current.value = "";
                inputAmountEdit.current.focus();

                const dataExpenses = await ExpenseService.loadExpensesFromOneMission(contextUser.user.id, idMission);
                setLstExpenses(dataExpenses);
                handleResetModal(true);

            } else {
                alert("Erreur à la update de la note");
            } //TODO: gestion Erreur


        } else {
            console.log(`Erreur à la récupération des infos de la note de frais!!`, event);
        }
    }

    const onClickShowModalUpdate = (expense) => {

        setModalExpense(expense)
        setModalType('update');
        setIsEditBtnDisabled(false);
        setModalChild((
            <ModalChildEditComponent

                isBtnDisabled={(boolValid) => { setIsEditBtnDisabled(boolValid) }}
                handleSubmitAdd={(event) => { onClickUpdateExpense(event) }}

                inputDateEdit={inputDateEdit}
                inputNatExpEdit={inputNatExpEdit}
                inputAmountEdit={inputAmountEdit}

                dateValue={Utils.formatDateToISO(expense.createdAt)}
                maxDate={Utils.formatDateToISO(aMission.endDate)}
                minDate={Utils.formatDateToISO(aMission.startDate)}

                lstExpenses={lstExpenses}

                oldValueDate={expense.createdAt}
                oldValueNat={expense.motif.name}
                oldValueAmount={expense.amount.toFixed(2)}

                isUpdate={true}
            />
        ));
        setModalShow(true);
        setModalTitle("Modifier un frais");
        setModalBtnLabel("Modifier");
    }


    //// DELETE Expense
    async function onClickDeleteExp(event) {

        event.preventDefault();

        const res = await ExpenseService.deleteExpense(modalExpense.id);

        if (!res) {
            alert("Erreur à la suppression : ", res);
        } else {
            handleResetModal(true);
        }
    }

    const onClickShowModalDelete = (expense) => {

        const lstInfosExpenseToDelete = [
            {
                'label': "Date du frais",
                'info': Utils.formatDateTimestampToStr(expense.createdAt)
            },
            {
                'label': "Nature du frais",
                'info': Utils.capitalizeFirstLetter(expense.motif.name)
            },
            {
                'label': "Dépense",
                'info': Utils.formatAmount(expense.amount)
            },
        ];

        setModalExpense(expense)
        setModalType('delete');
        setModalShow(true);
        setModalTitle("Supprimer un frais");
        setModalBtnLabel("Supprimer");
        setIsEditBtnDisabled(false);
        setModalChild((
            <ModalChildDeleteComponent
                lstInfosToDelete={lstInfosExpenseToDelete}
            />
        ));

    }


    //// VALID Expense
    async function onClickValidExpenses(event) {

        event.preventDefault();

        const response = await ExpenseService.updateDateExpenses(contextUser.user.id, aMission.id);

        if (response === true) {

            const dataExpenses = await ExpenseService.loadExpensesFromOneMission(contextUser.user.id, idMission);
            setLstExpenses(dataExpenses);
            handleResetModal(true);

        } else {
            alert("Erreur à la update de la note");
        } //TODO: gestion Erreur

    }

    const onClickShowModalValid = () => {
        setModalExpense(lstExpenses);
        setModalType('valid');
        setModalShow(true);
        setModalTitle("Valider la note de frais");
        setModalBtnLabel("Valider");
        setIsEditBtnDisabled(false);
        setModalChild((
            <ModalChildValidExpenseComponent
                expenseT={infosPrime.expTotal}
                expenseD={infosPrime.expDeduc}
                primeF={infosPrime.prime}
            />
        ));

    }


    if (aMission !== undefined) {
        return (
            <>
                <div id="title-cont">
                    <NavLink className="button_add"  to="/expenses"id="link-return"><KeyboardReturnRoundedIcon /></NavLink>
                    <h1>Saisie des notes de Frais</h1>
                </div>

                <div id="infos-mission-cont">

                    <div className='infos-mission-a'>
                        <div className="infos-mission">
                            <p className="label-info-mission">Date de début</p>
                            <p className="data-info-mission"> {aMission.startDate !== undefined ? Utils.formatDateTimestampToStr(aMission.startDate) : ""}</p>
                        </div>

                        <div className="infos-mission">
                            <p className="label-info-mission">Date de fin</p>
                            <p className="data-info-mission">{aMission.endDate !== undefined ? Utils.formatDateTimestampToStr(aMission.endDate) : ""}</p>
                        </div>

                        <div className="infos-mission">
                            <p className="label-info-mission">Nature</p>
                            <p className="data-info-mission">{aMission.natureCur !== undefined ? Utils.capitalizeFirstLetter(aMission.natureCur.name) : ""}</p>
                        </div>
                    </div>

                    <div className='infos-mission-b'>
                        <div className="infos-mission">
                            <p className="label-info-mission">Estimation prime</p>
                            <p className="data-info-mission">
                                {
                                    aMission.natureInit!== undefined  &&  aMission.natureInit.percentage !== undefined && aNatMisInit.id !== undefined && lstExpenses[0] !== undefined && lstExpenses[0].validAt === null ? (infosPrime.prime + " €") : (parseFloat(infosPrime.prime - infosPrime.expDeduc).toFixed(2) + "€")
                                }
                            </p>
                        </div>

                        <div className="infos-mission">
                            <p className="label-info-mission">Ville de départ</p>
                            <p className="data-info-mission">{aMission.departCity!== undefined && aMission.departCity.name !== undefined ? Utils.capitalizeFirstLetter(aMission.departCity.name) : ""}</p>
                        </div>

                        <div className="infos-mission">
                            <p className="label-info-mission">Ville d'arrivée</p>
                            <p className="data-info-mission">{aMission.arrivalCity!== undefined && aMission.arrivalCity.name !== undefined ? Utils.capitalizeFirstLetter(aMission.arrivalCity.name) : ""}</p>
                        </div>
                    </div>

                </div>

                <section className="d-flex justify-content-center">
                    {
                        (lstExpenses !== undefined || lstExpenses.length !== 0) && (<button className="button_add" onClick={() => onClickShowModalValid()}>
                            Valider la note de frais : <CheckCircleIcon />
                        </button>)
                    }
                </section>

                <div className="d-flex flex-column justify-content-center my-4">
                    <div className="text-center my-4 mx-4">
                        <Table responsive>

                            <thead>
                                <tr>
                                    <th className="table-subtitle">Date</th>
                                    <th className="table-subtitle">Nature</th>
                                    <th className="table-subtitle">Montant (€)</th>
                                    <th className="table-subtitle">Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {(lstExpenses === undefined || lstExpenses.length === 0) && (
                                    <tr>
                                        <td colSpan={8} className="text-center">
                                            Aucun résultat
                                        </td>
                                    </tr>
                                )}

                                {lstExpenses !== undefined && lstExpenses.length !== 0 &&
                                    lstExpenses.map((expense) => {
                                        return (

                                            <tr key={expense.id}>
                                                <td>{Utils.formatDateTimestampToStr(expense.createdAt)}</td>
                                                <td>{expense !== undefined ? Utils.capitalizeFirstLetter(expense.motif.name) : "n"}</td>
                                                <td>{Utils.formatAmount(expense.amount) + " €"}</td>
                                                <td>

                                                    <button className="button_icon button_edit">
                                                        <EditIcon className="icon_edit" onClick={() => onClickShowModalUpdate(expense)} />
                                                    </button>

                                                    <button className="button_icon button_delete" onClick={() => {
                                                        onClickShowModalDelete(expense)
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

                <section className="d-flex justify-content-center mb-4">
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

            </>
        );
    }


    return (<></>);

}


function validExpenses(lstNaturesExp, lstExpenses, mission, natMisInit) {

    let sumExpenseT = 0;
    let deduction = 0;

    for (let motif of lstNaturesExp) {

        let sumExpenseByNat = 0;

        const lstExpenseFilterByNat = lstExpenses.filter(exp => exp.motif.id === motif.id);
        const nbWorkingDays = Utils.getNbWorkingDate(mission);
        const maxSumNat = nbWorkingDays * motif.valCap;

        for (let exp of lstExpenseFilterByNat) {
            sumExpenseByNat += exp.amount;
        }

        if (motif.capped && sumExpenseByNat > maxSumNat) {
            deduction = sumExpenseByNat - maxSumNat;
        }

        sumExpenseT += sumExpenseByNat;
    }

    const infosPrime = {
        'expTotal': sumExpenseT,
        'expDeduc': deduction,
        'prime': parseFloat(Utils.getPrime(mission, natMisInit)).toFixed(2)
    }

    return infosPrime;
}