import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Installment from "../components/Installment";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Fields() {
  const classes = useStyles();

  const [startAmount, setStartAmount] = useState(5900);
  const [juros, setJuros] = useState(0.8);
  const [periodo, setPeriodo] = useState(12);
  const [parcelas, setParcelas] = useState([]);

  const handleInitMontChange = (e) => {
    setStartAmount(e.target.value);
  };

  const handleJurosChange = (e) => {
    setJuros(e.target.value);
  };

  const handlePeriodoChange = (e) => {
    setPeriodo(e.target.value);
  };

  useEffect(() => {
    let updParcelas = [];
    let updValue = parseInt(startAmount);
    for (let i = 1; i <= periodo; i++) {
      let instValue = updValue * (juros / 100);
      updValue += instValue;
      updParcelas.push({
        installmentCount: i,
        newAmount: updValue,
        difference: updValue - startAmount,
        percent: (updValue * 100) / startAmount - 100,
      });
    }
    setParcelas(updParcelas);
    return;
  }, [startAmount, juros, periodo]);

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="initMont"
          label="Montante inicial:"
          variant="outlined"
          type="number"
          InputProps={{ inputProps: { min: 100, step: 100 } }}
          value={startAmount}
          onChange={handleInitMontChange}
        />
        <TextField
          id="outlined-basic"
          label="Taxa de juros mensal:"
          variant="outlined"
          type="number"
          InputProps={{ inputProps: { min: -12, max: 12, step: 0.1 } }}
          value={juros}
          onChange={handleJurosChange}
        />
        <TextField
          id="outlined-basic"
          label="Período (meses):"
          variant="outlined"
          type="number"
          InputProps={{ inputProps: { min: 1 } }}
          value={periodo}
          onChange={handlePeriodoChange}
        />
      </form>
      <div className="flex-row" id="installments">
        {parcelas.map(
          ({ installmentCount, newAmount, difference, percent }, i) => {
            return (
              <Installment
                key={installmentCount}
                installmentCount={installmentCount}
                newAmount={newAmount}
                difference={difference}
                percent={percent}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
