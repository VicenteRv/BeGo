

export const validarPlaca = (plate:string)=>{
    //expresion regulra
    const regex = /^[A-Za-z0-9]{3}-[A-Za-z0-9]{2,5}$/;
    if (!regex.test(plate)) {
        throw new Error('La placa debe de tener un "-" despues del 3er caracter');
    }
    //Mayuscular y minusculas con numeros de 5 a 8 caracteres
    return true;

}