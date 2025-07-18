<img src="https://github.com/TheBugs-io/thebugs-api/blob/main/docs/thebugs.png?raw=true" width="100">

# Cadê a sala? - Frontend

1. [Sobre o projeto](#sobre-o-projeto)
2. [Tecnologias](#tecnologias)
3. [Requisitos](#requisitos)
4. [Detalhes de gestão](#quadro-kanban)
5. [Instruções de instalação](#como-rodar-este-projeto)
6. [Equipe](#equipe)

## Sobre o projeto
Cadê a sala? é uma aplicação web voltada à dinâmica cotidiana do bloco Instituto UFC Virtual, onde o curso de Sistemas e Mídias Digitais é realizado, com objetivo tornar mais eficiente e otimizar o fluxo de informações acerca da utilização das salas e laboratórios do Instituto.

## Detalhes do projeto
O curso de **Sistemas e Midias Digitais** da Universidade Federal do Ceará (UFC) possui atualmente uma planilha que funciona como o **mapa de salas** do bloco e que qualquer aluno pode acessar para consultar quando as salas estarão livres, para encontrar algum professor ou alguma disciplina.
<br>

A planilha também indica, de maneira bem limitada, as reservas de salas, contendo dia e horário em uma disposição de informações de baixa usabilidade.

### Tecnologias:

|**Front-end** |**Back-end**|
|------|-----|
|ReactJS |Node.js|
|CSS|PrismaORM|
|Axios |JWT e bcrypt|
|-|Express|
|-|PostgreSQL|

## Requisitos

### Legenda
- RFxxx= Requisitos Funcionais da Aplicação
- RNFxxx = Requisitos Não-Funcionais da Aplicação

**Total de Requisitos Funcionais:** 13

**Total de Requisitos Não-Funcionais:** 8

### Requisitos Funcionais
|   ID      |   Funcionalidade     |    Descrição      |    Front-end    |    Back-end    |  Design  |    Perfil      |      Prioridade       | Status |
|----|----|----|----|-----|-----|----|----|----|
|   RF001   |   Registro    | Como usuário, quero me registrar via solicitação de confirmação de vínculo a secretaria, vinculado ao SIGAA. | Validar dados e enviar solicitação de aprovação | Guardar a solicitação e notificar os secretários | Tela com arquitetura e sequências proposta para respectivos registros dos tipos, docente e discente. | Aluno  | Média | CONCLUIDO |
|   RF002   |   Autenticação    |   Como usuário, quero entrar na plataforma com minha conta.  | Exibir tela de login | Verificar/validar dados e retornar uma confirmação | Demonstrar a identidade visual do projeto |   Geral   |    Alta    | CONCLUIDO |
|   RF003   |   Mapa interativo |   Como usuário, quero visualizar o mapa interativo com layout das salas.  | Exibir opções para visualizar diferentes andares e escolher entre as salas | Filtrar, guardar em cache e fornecer os dados necessários | Representar (de forma abstrata ou realista) a planta do bloco e as cores que definem os status das salas | Geral  |    Média   | EM ANDAMENTO (60%) |
|RF004|Histórico de alterações|Como usuário administrador, quero visualizar o histórico de reserva de salas, autor, dia e horário, além de mudança de status.| Exibir lista/tabela de informações com acessibilidade | Registrar quais eventos aconteceram e quando | Design de acessibilidade |Aluno / Admin|Média| - | TODO |
|RF005|Gerenciamento de reservas de salas|Como usuário administrador, quero aprovar ou rejeitar reservas feitas por alunos.| Tela para ver os detalhes da reserva e decidir sobre ela | Registrar as reservas, ler e atualizá-las | Design de acessibilidade |Admin|Alta| TODO |
|RF006|Filtros de sala|Como usuário, quero filtrar ou pesquisar salas por data, horário, tipo ou local.| Atualizar o mapa conforme os filtros selecionados | Fornecer os dados para a data específica | Escolha de filtros pertinentes |Geral|Alta|
|RF007|Retirada de reserva automática|Como usuário administrador, quero que o sistema altere o status das salas de forma automática quando o tempo de reserva expirar.| - | Verificar o prazo da reserva e comparar com a data atual | - |Admin|Média|
|RF008|Detalhes da sala|Como usuário, quero conferir detalhes das salas, como a grade de horários/ocupações e fotos do local.| Exibir todos os dados de uma sala específica | Reunir e enviar todos os dados da sala selecionada | Hierarquia da informação e cores de destaque |Aluno / Professor|Desejável| EM ANDAMENTO (70%) |
|RF009|Notificação do sistema|Como usuário, quero receber notificações automáticas por e-mail ou no sistema para lembrar de reservas, alterações e cancelamentos| - | Enviar e-mails para os usuários | Designar o conteúdo das notificações |Aluno / Professor|Desejável| EM ANDAMENTO (40%) |
|RF010|Solicitação de reserva de sala|Como usuário, quero poder solicitar antecipadamente ou reservar sala diretamente caso esteja disponível no período de tempo desejado e cancelar minhas reservas| Criar um formulário e validar os dados antes de serem enviados | Registrar o pedido no histórico e informar os secretários | - |Aluno / Professor|Alta| TODO |
|RF011|Página do histórico do aluno|Como usuário, quero visualizar uma página de perfil com histórico das minhas reservas.| Listar as reservas do usuário na página de perfil | Fornecer o histórico de reservas do usuário | - |Geral|Média|
|RF012|Favoritar disciplinas do semestre|Como usuário, quero verificar as salas onde tenho aula, sem precisar pesquisar por elas toda vez.| Listar as disciplinas favoritadas do usuário | Guardar quais disciplinas o usuário favoritou | - |Aluno / Professor|Média|
|RF013|Dashboard de solicitações|Como SECRETARIO, quero visualizar as solicitações de registro com respectivos status e informações dos usuários pedintes como tipo, vínculo e outros. | Tela contendo todos as solicitações, categorizando id, email, nome, tipo, status | Verificar e puxar os dados referentes ao modelo de solicitação de registro | Admin | Média | CONCLUIDO |

### Requisitos Não-Funcionais

| ID     | Descrição                                                                                                                   | Prioridade | Status   |
| ------ | --------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- |
| RNF001 | O sistema deve seguir princípios de usabilidade e fornecer acessibilidade adequada.              | Alta       | - |
| RNF002 | O sistema deve proteger os dados dos usuários contra acessos não autorizados, utilizando autenticação e controle de acesso. | Alta       | - |
| RNF003 | O sistema deve ser responsivo, funcionando adequadamente em desktops e dispositivos móveis.                                 | Média      | - |
| RNF004 | O sistema deve ser compatível com leitores de tela.                                                                         | Alta       | - |
| RNF005 | O sistema deve oferecer opções de alto contraste para usuários com deficiência visual.                                      | Média      | - |
| RNF006 | O sistema deve utilizar um banco de dados relacional e garantir integridade transacional dos dados.                         | Média      | OK |
| RNF007 | O sistema deve permitir visualização e consulta de dados offline na versão PWA.                                             | Média      | - |
| RNF008 | O sistema deve utilizar criptografia para armazenamento e transmissão de dados sensíveis.                                   | Alta       | - |

## Quadro Kanban

Utilizando o Notion categorizando entre <b>Design e Code</b> sections:

<img src="https://github.com/user-attachments/assets/58ffc5d1-0c7d-4e14-a81f-1e40ea220b31">

<img src="https://github.com/user-attachments/assets/d28d5c01-e8ac-454f-92a2-5118e61a9c38">

## Como rodar este projeto

### Instruções de instalação

É necessário você possuir o nosso backend rodando junto ao front, caso for localmente. As instruções de instalação do backend, estão disponíveis [nesse repositório](https://github.com/TheBugs-io/thebugs-api.git). Além disso, é necessário possui o [NodeJS](https://nodejs.org/pt) instalado no seu computador.

### Com as instruções realizadas,

1. Clone este repositório com `git clone https://github.com/TheBugs-io/cadeasala-front.git` utilizando terminal ou IDE.
2. Acesse a pasta do projeto com `cd cadeasala-front` no terminal ou abrindo diretamente utilizando a IDE de sua preferência.
3. Rode o comando `npm install` para instalar as dependências presentes no package.json
4. Em modo de desenvolvimento, rode o projeto com `npm run dev`, ou caso queira rodar o build otimizado, utilize `npm run build` e `npm run preview`.

### Equipe:
- **Ingryd Duarte** - Backend/Testes | [Github](https://github.com/ingrydf12)
- **David Boanerges** - Gestão | [Github](https://github.com/DavidBoa)
- **Arthur Heráclio** - Front-end | [Github](https://github.com/arthurheraclio)
- **Renan Araujo** - Backend/Testes | [Github](https://github.com/Soiten)
- **Tiago Viana** - Frontend / Design | [Github](https://github.com/TiagoViana-hue)
- **Giovanna Sousa** - Arte / Design
