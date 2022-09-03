//Helper db yang dibuat
const mysql = require('../helpers/database')
//validation input
const joi = require('joi')

class _artikel {
    //list all todos
    listUser = async () => {
        try {
            const list = await mysql.query(
                'SELECT * FROM user',
                []
            )

            return {
                status: true,
                data: list
            }

        } catch (error) {
            console.error('addArtikel Artikel module Error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    //create User
    addUser = async(body) => {
        try {
            const schema = joi.object({
                nama_user: joi.string().required(),
                alamat: joi.string()
            })

            const validation = schema.validate(body)

            if(validation.error){
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const addusr = await mysql.query(
                'INSERT INTO user (nama_user, alamat) VALUE (?, ?)', 
                [body.nama_user, body.alamat]
            )

            return{
                status:true,
                data: addusr
            }
        } catch (error){
            console.error('addArtikel Artikel module Error: ',error)

            return {
                status: false,
                error
            }
        }
    }

    //create Artikel
    addArtikel = async(body) => {
        try {
            const schema = joi.object({
                isi_artikelnya: joi.string().required(),
                id_user : joi.string().required()
            })

            const validation = schema.validate(body)

            if(validation.error){
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const add = await mysql.query(
                'INSERT INTO isi_artikel (isi_artikelnya, id_user) VALUES (?,?)', 
                [body.isi_artikelnya, body.id_user]
            )

            return{
                status:true,
                data: add
            }
        } catch (error){
            console.error('addArtikel Artikel module Error: ',error)

            return {
                status: false,
                error
            }
        }
    }

    //create komentar
    addKomentar = async(body) => {
        try {
            const schema = joi.object({
                isi_komentar: joi.string().required(),
                id_user: joi.string().required(),
                id_artikel: joi.string().required()
            })

            const validation = schema.validate(body)

            if(validation.error){
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const add = await mysql.query(
                'INSERT INTO komentar (isi_komentar, id_user, id_artikel) VALUE (?,?,?)', 
                [body.isi_komentar,body.id_user,body.id_artikel]
            )

            return{
                status:true,
                data: add
            }
        } catch (error){
            console.error('addArtikel Artikel module Error: ',error)

            return {
                status: false,
                error
            }
        }
    }

    //Update Artikel
    editArtikel = async(body) => {
        try {
            const schema = joi.object({
                id_user: joi.number().required(),
                isi_artikelnya: joi.string().required()
            })

            const validation = schema.validate(body)

            if(validation.error){
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const edit = await mysql.query(
                'UPDATE isi_artikel SET isi_artikelnya=? WHERE id_user=?', 
                [body.isi_artikelnya, body.id_user]
            )
            
            return{
                status:true,
                data: edit
            }
        } catch (error){
            console.error('editArtikel Artikel module Error: ',error)

            return {
                status: false,
                error
            }
        }
    }
    

    //Delete Artikel
    deleteArtikel = async(id_artikel) => {
        try{
            const body = { id_artikel };
            const schema = joi.object({
                id_artikel: joi.number().required()
            })
            

            const validation = schema.validate(body)

            if(validation.error){
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const del =await mysql.query(
                'DELETE FROM isi_artikel WHERE id_artikel=?',
                [id_artikel]
            )

            return {
                status: true,
                data: del
            }
        } catch (error){
            console.error('deleteArtikel Artikel module Error: ',error)

            return {
                status: false,
                error
            }
        }
    }

}
module.exports = new _artikel()