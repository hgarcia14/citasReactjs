import React from 'react';
import { render, screen } from '@testing-library/react';
import Formulario from '../components/Formulario';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

const crearCita = jest.fn();

test('<Formulario /> Cargar el formulario y revisar que todo sea correcto', () => {
    //const wrapper = render(<Formulario />);

    render( <Formulario crearCita={crearCita} /> );
    expect( screen.getByText( 'Crear Cita' ) ).toBeInTheDocument();

    //Heading
    expect( screen.getByTestId( 'titulo' ).tagName ).toBe('H2');
    expect( screen.getByTestId( 'titulo' ).textContent ).toBe('Crear Cita');

    //Boton submit
    expect( screen.getByTestId( 'btn-submit' ).tagName ).toBe('BUTTON');
    expect( screen.getByTestId( 'btn-submit' ).textContent ).toBe('Agregar Cita');



});

test('<Formulario /> Validacion de formulario', () => {
    render( <Formulario crearCita={crearCita} /> );

    //Click en el boton de submit
    const btnSumbit = screen.getByTestId( 'btn-submit' );
    userEvent.click(btnSumbit);

    //Revisar por la alerta
    const alerta = screen.getByTestId( 'alerta' );
    expect( alerta ).toBeInTheDocument();
    expect( alerta.textContent ).toBe( 'Todos los campos son obligatorios' );
});

test('<Formulario /> Llenar formulario', () => {
    render( <Formulario crearCita={crearCita} /> );

    userEvent.type( screen.getByTestId( 'mascota' ), 'Hook' );
    userEvent.type( screen.getByTestId( 'propietario' ), 'Juan' );
    userEvent.type( screen.getByTestId( 'fecha' ), '2021-09-10' );
    userEvent.type( screen.getByTestId( 'hora' ), '10:30' );
    userEvent.type( screen.getByTestId( 'sintomas' ), 'Solo duerme' );

    const btnSumbit = screen.getByTestId( 'btn-submit' );
    userEvent.click(btnSumbit);

    //Revisar por la alerta
    const alerta = screen.queryByTestId( 'alerta' );
    expect( alerta ).not.toBeInTheDocument();

    //Crear cita y cmprobar que la funcion haya sido llamada
    expect( crearCita ).toHaveBeenCalled();
    expect( crearCita ).toHaveBeenCalledTimes(1);


});