import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import App from './App';
import axios from 'axios';

axios.get = jest.fn().mockResolvedValue({data: []});
axios.post = jest.fn().mockResolvedValue();
axios.put = jest.fn().mockResolvedValue();

test("Verifica se formulário foi renderizado", async() => {
  const {getByPlaceholderText, getByTestId, getByText} = render(<App />);
  
  expect(getByPlaceholderText('Atividade')).toBeInTheDocument();
  expect(getByTestId('selectDia')).toBeInTheDocument();
  expect(getByTestId('selectHora')).toBeInTheDocument();
  expect(getByText(/Adicionar/)).toBeInTheDocument();

  await wait();
})

test("Verifica se pelo menos uma atividade aparece", async () => {
  axios.get = jest.fn().mockResolvedValue({
    data: [
      {
        "day": "segunda",
        "hour": "3",
        "complete": false,
        "text": "tarefa teste",
        "id": "3vkxdZQTzq4ew5jB0jDM"
      }
    ]
  })

  const {findByText} = render(<App />)

  const tarefa = await findByText("3h - tarefa teste")
  expect(tarefa).toHaveStyle('text-decoration: none')
  expect(tarefa).toBeInTheDocument();

  await wait(() => expect(axios.get).toHaveBeenCalledTimes(1))
})

test('Criação de tarefa', async () => {
  axios.post = jest.fn().mockResolvedValue();

  const {getByPlaceholderText, getByTestId, getByText} = render(<App />);

  const input = getByPlaceholderText('Atividade');
  await userEvent.type(input, 'tarefa teste 2')
  expect(input).toHaveValue('tarefa teste 2');

  const selectDia = getByTestId('selectDia');
  await userEvent.selectOptions(selectDia, 'sabado')
  expect(selectDia).toHaveValue('sabado');

  const selectHora = getByTestId('selectHora');
  await userEvent.selectOptions(selectHora, '6')
  expect(selectHora).toHaveValue('6');

  const botao = getByText(/Adicionar/);
  userEvent.click(botao);

  expect(axios.post).toHaveBeenCalledWith('https://us-central1-labenu-apis.cloudfunctions.net/generic/planner-julian-mauro', {
    text: 'tarefa teste 2',
    day: 'sabado',
    hour: '6',
    complete: false
  })

  await wait(() => expect(input).toHaveValue(''))
  await wait(() => expect(selectDia).toHaveValue('segunda'))
  await wait(() => expect(selectHora).toHaveValue('0'))
})

test('Marcar tarefa como completa', async () => {
  axios.get = jest.fn().mockResolvedValue({
    data: [
      {
        "day": "segunda",
        "hour": "3",
        "complete": false,
        "text": "tarefa teste",
        "id": "3vkxdZQTzq4ew5jB0jDM"
      }
    ]
  })

  const {findByText} = render(<App />)

  const tarefa = await findByText("3h - tarefa teste")

  fireEvent.click(tarefa)

  await expect(axios.put).toHaveBeenCalledWith('https://us-central1-labenu-apis.cloudfunctions.net/generic/planner-julian-mauro/3vkxdZQTzq4ew5jB0jDM', {
    complete: true
  })
})