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
  - In this case, we will fill in the logradouro and click in the "Buscar Endereço" button.
    The API will find for an address that contains this logradouro and fill in this field with this address

The "Limpar Formulário" button clears all form inputs.  
The "Salvar Cliente" button save the customer whose the data were filled in the form

!['Customer Registry'](/src/README_images/Cadastrar%20Clientes.png)

### Fourth Screen (After Find an Address)

This screen shows how the "Endereco" field will be filled after the user insert customer's address and the API finds this address in the database.  
The field will recieve only the "logradouro" of the address, the user can confirm with the customer if the address is correct

!['After Find an Address'](/src/README_images/Pós%20busca%20de%20endereço.png)

### Fifth Screen (Customer successfuly saved)

This screen shows the popup that will appear when the customer is successfuly saved. Just one popup showing that the operation was successful.

!['Customer successfuly saved'](/src/README_images/Cliente%20salvo%20com%20sucesso.png)

### Sixth Screen (Find a customer)

This is the screen to search for a customer. The only way to search for the customer is by name, but it does not have to be the customer exact name.  
In the API, the endpoint that treats the name search accept parth of the name and returns all names that conatain that part.  
If the user does not know the exact name of the customer, entering the first name will return it in the table.

The table have five columns, but i want to explain the first one.  
When you click on it, it selects the entire line. In other words, it selects that customer so that it can be manipulated with the buttons below.

The buttons are:

**Proxima Página (Next Page)**  
The table will contain a maximun number of rows. If the results contains more lines than the limit, the button will lead to the next page of the table.

**Consultar Endereço (Consult Address)**  
With the selected customer (First column selected), when you click this button, will open a popup (explained in the next image) containing the data of the customer address

**Consultar Telefones (Consult Phones)**  
Follows the same logic of "Consultar Endereço"

**Editar Dados (Edit Data)**  
With the selected customer, when click this button, the sistem will "get" this customer data and will lead it to the customer registry screen, but all form fields will be filled automatically
with the selected customer data. The user make the changes he wants and will save the customer, thus updating it.

!['Find a customer'](/src/README_images/Buscar%20clientes.png)