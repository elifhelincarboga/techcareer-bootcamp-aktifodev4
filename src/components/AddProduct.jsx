import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup';


const addProductValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name boş bırakılmaz"),
    unitPrice: Yup.number().required("Unit Price boş bırakılmaz"),
    unitsInStock: Yup.number().min(0, "Stock 0'dan küçük olamaz").required("Stock boş bırakılmaz"),
    quantityPerUnit: Yup.string().required("Quantity Per Unit boş bırakılmaz")
})

function AddProduct() {


    const formik = useFormik({
        initialValues: {
            name: "",
            unitPrice: 0,
            unitsInStock: 0,
            quantityPerUnit: ""
        },
        validationSchema:addProductValidationSchema,
        onSubmit: (values) => {
            fetch('https://northwind.vercel.app/api/products', {
  	            method: 'POST',
  	            headers: {
    	            'Content-Type': 'application/json',
  	            },
  	            body: JSON.stringify({...values})
            })
        }
    })

    

    return (<>
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="">Name</label>
                <input type='text' name='name' onChange={formik.handleChange}
                    value={formik.values.name}  />
                {formik.errors.name ? <p style={{color:'red'}}>{formik.errors.name}</p> : <></>}
            </div>
            <div>
                <label htmlFor="">Unit Price</label>
                <input type='number' name='unitPrice' onChange={formik.handleChange}
                    value={formik.values.unitPrice}  />
                      {formik.errors.unitPrice ? <p style={{color:'red'}}>{formik.errors.unitPrice}</p> : <></>}
            </div>
            <div>
                <label htmlFor="">Stock</label>
                <input type='number' name='unitsInStock' onChange={formik.handleChange}
                    value={formik.values.unitsInStock}  />
                      {formik.errors.unitsInStock ? <p style={{color:'red'}}>{formik.errors.unitsInStock}</p> : <></>}
            </div>
            <div>
                <label htmlFor="">Quantity Per Unit</label>
                <input type='text' name='quantityPerUnit' onChange={formik.handleChange}
                    value={formik.values.quantityPerUnit}  />
                {formik.errors.quantityPerUnit ? <p style={{color:'red'}}>{formik.errors.quantityPerUnit}</p> : <></>}
            </div>
            <div>
                <button type='submit'>Add</button>
            </div>
        </form>
    </>)
}

export default AddProduct