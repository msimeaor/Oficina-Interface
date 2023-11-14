# Oficina-Interface

**This is the interface that complements the API developed in the "Oficina" repository project, in this profile.  
It is simple and its main purpose is to be easy to use and intuitive.**

## Screens

**Next, I will present each screen of interface (until now) and I will explain how each one will work in pratice**

### First Screen (Login)

This is the login screen. Whenever accessed, the sistem will display this screen and ask the user's credentials.

!["Login screen"](/src/README_images/Login.png)

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
- Address (optional)
  - In this case, we will fill in the logradouro and click in the "Buscar Endereço" button.
    The API will find for an address that contains this logradouro and fill in this field with this address

The "Limpar Formulário" button clears all form inputs.  
The "Salvar Cliente" button save the customer whose the data were filled in the form

!['Customer registry'](/src/README_images/Cadastrar%20Clientes.png)

### Fourth Screen (After Find an Address)

This screen shows how the "Endereco" field will be filled after the user insert customer's address and the API finds this address in the database.  
The field will recieve only the "logradouro" of the address, the user can confirm with the customer if the address is correct

!['After find an address'](/src/README_images/Pós%20busca%20de%20endereço.png)

### Fifth Screen (Customer Successfuly Saved)

This screen shows the popup that will appear when the customer is successfuly saved. Just one popup showing that the operation was successful.

!['Customer successfuly saved'](/src/README_images/Cliente%20salvo%20com%20sucesso.png)

### Sixth Screen (Find a Customer)

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

### Seventh Screen (Display a Customer Address)

This screen shows the popup that appears when a customer is selected in the table and the button "Consultar Endereço" is clicked.  
Into the popup, appears the logradouro and UF of the client address that was selected.

!['Display a customer address'](/src/README_images/Exibição%20endereço%20de%20um%20cliente.png)

### Eigth Screen (Display the Customer Phones)

This screen, like the address display screen, is opened when the customer is selected, and the "Consultar Telefones" button is clicked.  
A popup is than displayed showing all phones registered for the customer.

!['Display the customer phones'](/src/README_images/Exibição%20telefone%20de%20um%20cliente.png)

### Ninth Screen (Address Registry)

This screen its similar to the customer registry, but now it is to registering the address. To registry an address, we need to fill in the following fields:
- Logradouro
- UF
- Morador (optional)
  - The user insert the resident name and the API will search a record in the database that matches. If find, the field is filled with the fully customer name.

How can an address have several residents, I made it available the "Adicionar" and "Remover" buttons.  
This way, when searching for a customer and clicking the "Adicionar" button, this client will be added to the list of customer that lives in this address.  
If a wrong customer was added, for example, just search again and, when his name fill the field,  
click in "Remover" button and your name will be removed of the customer list that lives in this address.

When the "Salvar" button is clicked, all the customers that was added will be related with the address.

The "Limpar Formulário" button clears all form fields (does not remove customers that have already been added in the "Morador" field)

!['Address registry'](/src/README_images/Cadastrar%20endereços.png)

### Tenth Screen (Address Successfuly Saved)

This popup will appears when an address is successfuly saved. Just a popup saying that operation was successfuly completed.

!['Address successfuly saved'](/src/README_images/Endereço%20salvo%20com%20sucesso.png)

### Eleventh Screen (Find an Address)

This is the screen to search an address. The search only can be done by the logradouro.  
When inserting the logradouro or a bit of it and click in the "Buscar" button, the table below is filled with all address that contains logradouros
according to searched in the field.

The logic to select an address and manipulate it is the same as the customer mentioned above.

If the search returns more addresses than the number of rows in the table, the "Proxima Pagina" button leads to the next page with new results.

With the selected address, its possible to edit it by clicking the "Editar Dados" button. The editing logic is the same as for the customer.

!['Find an address'](/src/README_images/Buscar%20endereço.png)

### Twelfth Screen (Phone Registry)

This is the screen to save phones. Contains just two fields, one for insert the phone number and other for insert the owner.  
The logic to insert the owner is the same as the address registry. The difference is that only one owner can be added here.

The "Limpar Formulario" button clears the form and the button "Salvar Telefone" saves the data typed in the fields

!['Phone registry'](/src/README_images/Cadastrar%20telefones.png)

### Thirteenth Screen (Phone Successfuly Saved)

This popup appears when the "Salvar Telefone" button is clicked and the phone is successfuly saved.

!['Phone successfuly saved'](/src/README_images/Telefone%20salvo%20com%20sucesso.png)

### Fourteenth Screen (Find a Phone)

This is the screen for searching phones. The search is made by phone number and only one record is returned.  
When click in "Editar Dados" button, the system leads the user to the phone registry screen and fills in the fields automaticaly
with the searched phone data. When editing, its possible to replace the owner.

The "Consultar Proprietário" button opens a popup containing the phone owner's data.
This popup will be explained in the next image.

!['Find a phone'](/src/README_images/Buscar%20telefone.png)

### Fifteenth Screen (Phone Owner Data)

This is the popup opened when the "Consultar Proprietário" button is clicked. It contains the data of the searched phone owner.

!['Phone Owner Data'](/src/README_images/Consultar%20proprietário%20telefone.png)