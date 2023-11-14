# Oficina-Interface

**This is the interface that complements the API developed in the "Oficina" repository project, in this profile.
It is simple and its main purpose is to be easy to use and intuitive.**

## Screens

**Next, I will present each screen of interface (until now) and I will explain how each one will work in pratice**

### First Screen (Login)

This is the login screen. Whenever accessed, the sistem will display this screen and ask the user's credentials.

!["Login Screen"](/src/README_images/Login.png)

### Second Screen (Home)

This is the screen that will open after successful login. It will contain links to all the services that the system offers.
At the moment (11/14/2023) there are three links, but it will contain a few more

!['Home screen'](/src/README_images/Inicial.png)

### Third Screen (Customer Register)

This is the first service screen that the system offers. this is the new customer registration screen. To registry a customer, we must fill in the following fields:
- Name
- CPF
- Email
- Brithday
- Gender
- Address
  - In this case, we will fill in the logradouro and click in the "Buscar Endereço" button. The API will find for an address that contains this logradouro and fill in this field with this address

The "Limpar Formulário" button clears all form inputs.
The "Salvar Cliente" button save the customer whose the data were filled in the form

!['Customer Registry'](/src/README_images/Cadastrar%20Clientes.png)