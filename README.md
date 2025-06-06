
## 🚀 Funcionalidades de foco

 - Criar uma área exclusiva no site da **BRASFI** para hospedar **webinars, workshops e cursos online**, com integração de ferramentas de videoconferência.
 - Implementar um sistema automático de **emissão de certificados** ao final de cursos e eventos realizados
 - Disponibilizar **um espaço virtual de discussões**, onde estudantes, especialistas e parceiros possam trocar ideias e experiências.

## 👤  Histórias de usuários

 - Como **administrador** desejo criar e publicar um curso
 - Como **usuário** desejo acessar o conteúdo do curso disponível
 - Como **usuário** desejo encontrar o curso que desejo em uma aba de pesquisa
 - Desejo emitir certificado e ver-lo salvo em uma seção de certificados
 - Como **usuário** desejo adicionar postagem
 - Editar essa postagem
 - E excluir a postagem criada
 - Como **administrador** desejo poder remover uma postagem

## Futuros aprimoramentos

Após ter adicionado todas a ferramentas essenciais para o desenvolvimento web criado para a BRASFI, algumas das funcionalidades futuras seria:
 - integrar a plataforma com um sistema CRM para acompanhar o engajamento dos participantes
Amplia o alcance da BRASFI e melhora o gerenciamento dos participantes.
 - Disponibilizar materiais educacionais como e-books, infográficos, artigos e videoaulas
Torna a área educacional mais abrangente e útil para diferentes tipos de usuários, incluindo pessoas com deficiência

## Tecnologias/Linguagens usadas:

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Spring Web](https://img.shields.io/badge/Spring_Web-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Spring Data JPA](https://img.shields.io/badge/Spring_Data_JPA-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)


## Utilizando o projeto

O projeto possui alguns cursos e uma conta admin pré-codificados pois trabalha com um banco de dados local com base na sua máquina como forma de demonstrar as funcionalidades do site individualmente.

Para utilizar o repositório é necessário seguir os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [Link do repositório]
    ```

2.  **Navegue até a pasta do frontend:**
    ```bash
    cd frontend
    ```
    * Caso seja a primeira vez utilizando esse framework, será necessário realizar um `npm install` para instalar as dependências:
        ```bash
        npm install
        ```
    * Para rodar o frontend, é necessário ter o **Node.js** instalado (versão 18.18.0, 19.8.0 ou uma versão igual/maior que a 20.0.0). Após a instalação das dependências, você pode testar o projeto no `http://localhost:3000` (instruções de como rodar o frontend virão mais abaixo).

### Configuração e Execução do Backend (Spring Boot)

O backend do projeto utiliza **Java (com Spring Boot)** e um **banco de dados PostgreSQL**. Para que ele funcione localmente, você precisa ter o PostgreSQL instalado e rodando em sua máquina.

#### Requisitos para o Backend

* **Java Development Kit (JDK):** Versão 17 ou superior.
* **Banco de Dados PostgreSQL:** Servidor PostgreSQL (versão 12+ é recomendada).
    * **Importante:** Você precisa ter o servidor PostgreSQL instalado e em execução.
    * **Recomendado:** Ter uma ferramenta de gerenciamento como pgAdmin 4 ou DBeaver.

#### Passos para Configurar o Banco de Dados (PostgreSQL)

**Opção A: Instalação Direta do PostgreSQL (Recomendado para uso inicial)**

1.  **Instale o PostgreSQL:** Baixe e instale o PostgreSQL de acordo com seu sistema operacional:
    * **Windows:** Baixe o instalador interativo em [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/). Siga as instruções do instalador para definir uma senha para o usuário `postgres` (se você usou `root` no `application.properties` do backend, defina `root` aqui).
    * **macOS (via Homebrew):**
        ```bash
        brew install postgresql
        brew services start postgresql
        ```
    * **Linux (ex: Ubuntu/Debian):**
        ```bash
        sudo apt update
        sudo apt install postgresql postgresql-contrib
        sudo systemctl start postgresql
        sudo systemctl enable postgresql # Para iniciar automaticamente no boot
        ```

2.  **Crie o banco de dados `projeto3`:** O backend espera um banco de dados com este nome.
    * **Via pgAdmin (ferramenta gráfica):** Conecte-se ao seu servidor PostgreSQL, clique com o botão direito em `Databases` -> `Create` -> `Database...` e nomeie-o como `projeto3`.
    * **Via `psql` (terminal):**
        ```bash
        # Se precisar definir a senha do usuário 'postgres':
        # sudo -i -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'root';"
        psql -U postgres -d postgres # Conecte-se ao banco de dados padrão 'postgres'
        CREATE DATABASE projeto3;
        \q
        ```
        (Para sair do usuário `postgres` no Linux: `exit`)

3.  **Verifique as credenciais:** O arquivo de configuração do backend (`backend/src/main/resources/application.properties`) utiliza as seguintes credenciais padrão:
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/projeto3
    spring.datasource.username=postgres
    spring.datasource.password=root
    ```
    Certifique-se de que o seu servidor PostgreSQL está configurado para aceitar conexões com o usuário `postgres` e a senha `root`, ou ajuste estas linhas no `application.properties` para corresponder às suas credenciais.

**Opção B: Usando Docker para o PostgreSQL (Alternativa para ambiente de desenvolvimento consistente)**

1.  Certifique-se de ter o [Docker Desktop](https://www.docker.com/get-started/) instalado e em execução em sua máquina.
2.  No terminal, na raiz do seu projeto (ou em qualquer lugar, desde que o Docker esteja rodando), execute o seguinte comando para iniciar um container PostgreSQL:
    ```bash
    docker run --name projeto3-postgres -e POSTGRES_PASSWORD=root -e POSTGRES_DB=projeto3 -p 5432:5432 -d postgres:latest
    ```
    Este comando irá:
    * Baixar a imagem mais recente do PostgreSQL (`postgres:latest`).
    * Criar um container chamado `projeto3-postgres`.
    * Definir a senha do usuário `postgres` como `root`.
    * Criar automaticamente um banco de dados chamado `projeto3`.
    * Mapear a porta 5432 do seu host para a porta 5432 do container.
    * Rodar o container em segundo plano (`-d`).
3.  Para verificar se o container está rodando: `docker ps`
4.  Para parar o container: `docker stop projeto3-postgres`
5.  Para remover o container (e seus dados, se não estiver usando volumes persistentes): `docker rm projeto3-postgres`

#### Executando o Backend

Após configurar o banco de dados e garantir que o servidor PostgreSQL esteja ativo, você pode iniciar o backend:

1.  Navegue até o diretório do backend:
    ```bash
    cd backend
    ```
    (Se você já estava na pasta `frontend`, use `cd ../backend`)

2.  Execute a aplicação Spring Boot usando o Maven Wrapper:
    ```bash
    # Para Windows:
    .\mvnw spring-boot:run

    # Para Linux/macOS:
    ./mvnw spring-boot:run
    ```
    A aplicação backend estará acessível, por padrão, em `http://localhost:8080`.

### Executando o Frontend
Utilize `cd frontend`  e rode `npm run dev`

## Conta de Usuário padrão:
Usuário: Admin

Email: admin@admin.com

Senha: admin123
