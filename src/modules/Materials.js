import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {withRouter, Redirect} from 'react-router';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { TextField, Typography } from '@material-ui/core';
import Navbar from './components/Navbar';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    tableHead:{
        fontWeight: 'bold',
        backgroundColor:'#3f51b5',
        color:'white'
    },
    container: {
        width: '90%',
        marginLeft: '5%',
        marginBottom: '40px',
        marginTop:'40px',
    },
    addWorker:{
        width:'60%',
        marginTop:'15px'
    },
    hed:{
        fontFamily:'Courier New',
        fontSize:'50px',
        textAlign:'center',
        marginTop: 0
    },
    root:{
      width:'60%',
      padding: '15px',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
    },
    field:{
        width:"50%",
        marginTop:'15px'
    },
    fieldId:{
      width:"20%",
      marginTop:'15px'
    },
    forms:{
      display:'flex',
      flexDirection: 'row'
    },
    editButtons:{
      display:'flex',
      flexDirection: 'row',
    },
    editButt:{
      width:'60%',
      marginTop:'15px',
      marginRight:'15px'
    },
    buttonsForms:{
      width:'30%',
    },
    goForm:{
      width:'60%',
      display:'flex',
      flexDirection:'column',
      paddingLeft:'20px',
    },
    goButtons:{
      marginTop: '20px'
    }
  });



  export default function Materials ({materialtable,materials,brands,typematerials}) {
   const classes = useStyles();

  const [fields, setFields] = useState({NameOfMaterial: '', Count: '', BasePrice:'', BrandName:'', BrandDescription:'',TypeOfMaterial:'', Description:''})

  const [id, setId] = useState('');

  function handleChange(evt) {
    const value = evt.target.value;
    setFields({
      ...fields,
      [evt.target.name]: value
    });
  }

  function handleClick(){
    let isNewBrand = true;
    let brandID;
    let isNewType = true;
    let typeID;

    let sendBrand = {};
    let sendMaterial = {};
    let sendMaterialType = {};

    let ifNewId;
    let brandsSize = 0;
    
    let ifNewType;
    let typesSize = 0;

    brands.forEach(brand => {
      if(brand.BrandName == fields.BrandName)
      {
        isNewBrand = false;
        brandID = brand.ID;
      }      
      ifNewId = brand.ID;
    });  

    ifNewId++;

    if(isNewBrand && fields.BrandName){

      console.log("new brand");

      brandID = ifNewId;

      sendBrand.ID = brandID;
      sendBrand.BrandName = fields.BrandName;
      sendBrand.BrandDescription = fields.BrandDescription;

      fetch('/brands', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendBrand)
      })

    }

    typematerials.forEach(type => {
      if(type.TypeOfMaterial == fields.TypeOfMaterial)
      {
        isNewType = false;
        typeID = type.ID;
      }      
      ifNewType = type.ID;
    });  

    ifNewType++;

    if(isNewType && fields.TypeOfMaterial){

      console.log("new type");
      
      typeID = ifNewType;

      sendMaterialType.ID = typeID;
      sendMaterialType.TypeOfMaterial = fields.TypeOfMaterial;
      sendMaterialType.Description = fields.Description;

      fetch('/typeofmaterial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendMaterialType)
      })

    }

    
    sendMaterial.BrandID = brandID;
    sendMaterial.TypeOfMaterialID = typeID;
    sendMaterial.NameOfMaterial = fields.NameOfMaterial;
    sendMaterial.BasePrice = fields.BasePrice;
    sendMaterial.Count = fields.Count;
    
    let isFull = true;
    console.log(sendMaterial);
    if(Object.values(sendMaterial).forEach(field => {
      if(!field){
        isFull = false;
      }
      console.log(field)
    }))

    console.log(isFull);

    if(isFull){
    fetch('/materials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendMaterial)
    }).then(()=>{
      setFields({NameOfMaterial: '', Count: '', BasePrice:'', BrandName:'', BrandDescription:'',TypeOfMaterial:'', Description:''})
    })
  }
   }
    function handleDelete(){}

  function handleUpdate(){
  }

  function createData() {
    let tmpData = [];
    for(let i = 0; i < materialtable.length; i++){
        tmpData.push({
            ID: materialtable[i].ID,
            NameOfMaterial: materialtable[i].NameOfMaterial ,
            Count: materialtable[i].Count,
            BasePrice: materialtable[i].BasePrice,
            BrandName: materialtable[i].BrandName,
            BrandDescription: materialtable[i].BrandDescription,
            TypeOfMaterial: materialtable[i].TypeOfMaterial,
            Description: materialtable[i].Description,
         })
      }
    return tmpData;
  }
  
  const rows = createData();

  return (
    <div>
      <Navbar></Navbar>
    <h1 className={classes.hed}>
        Materials
    </h1>
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHead}>ID</TableCell>
            <TableCell align="right" className={classes.tableHead}>Name</TableCell>
            <TableCell align="right" className={classes.tableHead}>Count</TableCell>
            <TableCell align="right" className={classes.tableHead}>BasePrice</TableCell>
            <TableCell align="right" className={classes.tableHead}>BrandName</TableCell>
            <TableCell align="right" className={classes.tableHead}>BrandDescription</TableCell>
            <TableCell align="right" className={classes.tableHead}>Type of Material</TableCell>
            <TableCell align="right" className={classes.tableHead}>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {row.ID}
              </TableCell>
              <TableCell align="right">{row.NameOfMaterial}</TableCell>
              <TableCell align="right">{row.Count}</TableCell>
              <TableCell align="right">{row.BasePrice}</TableCell>
              <TableCell align="right">{row.BrandName}</TableCell>
              <TableCell align="right">{row.BrandDescription}</TableCell>
              <TableCell align="right">{row.TypeOfMaterial}</TableCell>
              <TableCell align="right">{row.Description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div className={classes.forms}>
    <form className={classes.root} noValidate autoComplete="off">
    <TextField id="standard-basic" label="NameOfMaterial" className={classes.field} 
    value={fields.NameOfMaterial}
    onChange={handleChange}
    name="NameOfMaterial"
    />
    <TextField id="standard-basic" label="Count" className={classes.field}
    value={fields.Count}
    onChange={handleChange}
    name="Count"
    type="number"
    />
    <TextField id="standard-basic" label="BasePrice" className={classes.field}
    value={fields.BasePrice}
    onChange={handleChange}
    name="BasePrice"
    type="number"
    />
    <TextField id="standard-basic" label="BrandName" className={classes.field}
    value={fields.BrandName}
    onChange={handleChange}
    name="BrandName"
    />
    <TextField id="standard-basic" label="BrandDescription" className={classes.field}
    value={fields.BrandDescription}
    onChange={handleChange}
    name="BrandDescription"
    />
    <TextField id="standard-basic" label="TypeOfMaterial" className={classes.field}
    value={fields.TypeOfMaterial}
    onChange={handleChange}
    name="TypeOfMaterial"
    />
    <TextField id="standard-basic" label="Description" className={classes.field}
    value={fields.Description}
    onChange={handleChange}
    name="Description"
    />  
            
    <Button            
            fullWidth
            variant="contained"
            color="primary"
            className={classes.addWorker}
            onClick={handleClick}
          >
            Add material
    </Button>
    </form>
    <div className={classes.buttonsForms}>
    <form className={classes.root} noValidate autoComplete="off">
    <TextField id="standard-basic" label="ID" className={classes.fieldId}
    type="number"
    value={id}
    onChange={(e) => setId(e.target.value)}
    name="ID"
    />
      <div className={classes.editButtons}>
    <Button            
            variant="contained"
            className={classes.editButt}
            onClick={handleUpdate}
          >
            Update
    </Button>
    <Button            
            variant="contained"
            color="secondary"
            className={classes.addWorker}
            onClick={handleDelete}
          >
            Delete
    </Button>
    </div>
    </form>
    </div>
    </div>

    </div>
  );
}