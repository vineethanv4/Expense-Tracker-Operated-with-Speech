import React, { useContext, useState, useEffect } from "react";
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem, Menu, Divider } from '@material-ui/core'
import useStyles from './styles'
import { ExpenseTrackerContext } from "../../../context/context";
import { v4 as uuidv4 } from 'uuid';
import { incomeCategories, expenseCategories } from "../../../constants/categories";
import formatDate from '../../../utils/formatDate';
import { useSpeechContext } from "@speechly/react-client";
import CustomizedSnackbar from "../../Snackbar/Snackbar";
console.log("pass8");

const initialState = {
    amount: '',
    category: '',
    type: 'Income',
    date: formatDate(new Date()),
}

const Form = () => {

    const classes = useStyles();
    const [formData, setFormData] = useState(initialState);
    const { addTransaction } = useContext(ExpenseTrackerContext);
    const { segment } = useSpeechContext();
    const [open, setOpen] = useState(false);
    const createTransaction = () => {
        const transaction = { ...formData, amount: Number(formData.amount), id: uuidv4() };
        setOpen(true);
        addTransaction(transaction);
        setFormData(initialState);
    }

    useEffect(() => {
        if (segment) {
            console.log(segment.intent.intent);
            if (segment.intent.intent === 'add_expense') {
                setFormData({ ...formData, type: "Expense" });
            }
            else if (segment.intent.intent === 'add_income') {
                setFormData({ ...formData, type: "Income" });
            }
            else if (segment.intent.intent === 'create_transaction') {
                return createTransaction();
            }
            else if (segment.intent.intent === 'cancel_transaction') {
                return setFormData(initialState);
            }
            console.log(segment.entities);
            segment.entities.forEach((e) => {
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`;
                switch (e.type) {
                    case 'amount':
                        setFormData({ ...formData, amount: e.value });
                        break;
                    case 'category':
                        if (incomeCategories.map((ic) => ic.type).includes(category)) {
                            setFormData({ ...formData, type:'Income', category });
                        }
                        else if(expenseCategories.map((ic) => ic.type).includes(category)){
                            setFormData({...formData, type: 'Expense',category});
                        }
                        break;
                    case 'date':
                        setFormData({ ...formData, date: e.value });
                    default:
                        break;
                }
            })
        }
    }, [segment]);
    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;
    // console.log(formData);
    // console.log(1);
    return (
        <Grid container spacing={2}>
            <CustomizedSnackbar open={open} setOpen={setOpen}/>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    {segment ? (
                        <>
                            {console.log(segment.intent.intent)}
                            {segment.words.map((w) => w.value).join(" ")}
                        </>
                    ) : null}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                        {selectedCategories.map((c) => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" label="Amount" fullwidth value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
            </Grid>
            <Grid item xs={6}>
                <TextField type='date' label="Date" fullwidth value={formData.date} onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value) })} />
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction} >Create</Button>
        </Grid>
    )
}

export default Form