# Sistema de Gestão de Loja de Roupas - Full-Stack

Este é um projeto Full-Stack completo para gestão de uma loja de roupas, desenvolvido por mim desde o planejamento até a implementação. O sistema abrange todas as etapas, desde a modelagem do banco de dados utilizando o Br-modelo até a construção do back-end com Node.js e Express, usando o Prisma para auxiliar na criação do banco de dados PostgreSQL. O Front-End foi desenvolvido usando Next.js, enquanto o aplicativo foi construído utilizando React Native.

## Funcionalidades

- Sistema de login seguro, com criptografia de senhas e tokens para garantir a segurança das informações.
- Controle rigoroso de autenticação, implementado no front-end e na API, por meio de um arquivo separado de contexto responsável por lidar com usuários credenciados.
- Cadastro, edição, listagem, filtros e detalhes de colaborador, cliente, produtos, representante e fábrica.
- Cadastro detalhado de produtos, permitindo a inclusão de cor, tamanho e quantidade específica para cada combinação de cor e tamanho.
- Possibilidade de realizar pedidos de venda com funcionalidades completas, incluindo adição e remoção de itens, controle de pedidos em aberto, fechados e em rascunho.
- Módulo de Caixa com controle de caixa, abertura, fechamento, entradas e retiradas rigorosamente registrados.
- Registro de pagamentos de pedidos com opções para pagamentos em dinheiro, cartão, misto dinheiro e cartão e crediário, incluindo filtros e relatórios.
- Rígido controle de níveis de acesso, garantindo que apenas usuários autorizados possam executar determinadas ações no sistema.
- Financeiro, cuidando das contas a pagar e a receber, com cálculo automático de holerites para os colaboradores com base em suas comissões de vendas.
- Controle de quebra de caixa, com possibilidade de reversão pelo gerente em caso de valores perdidos.
- Entre Outras.

## Tecnologias Utilizadas

- Back-End: Node.js, Express, Prisma, PostgreSQL.
- Front-End: Next.js.
- Aplicativo: React Native.
- Clean Code: O projeto foi desenvolvido seguindo boas práticas de código limpo, resultando em um código robusto e de fácil manutenção.

## Instalação

1 - Clone o repositório do projeto.

2 - Instale as dependências do back-end usando o gerenciador de pacotes npm:
- cd backend
- npm install

3 - Configure o banco de dados PostgreSQL com as informações necessárias no arquivo .env.

4 - Execute as migrações do banco de dados usando Prisma:
- npx prisma migrate dev

5 - Inicie o servidor do back-end:
- npm start

6 - Instale as dependências do front-end:
- cd frontend
- npm install

7 - Inicie o servidor do front-end:
- npm run dev

8 - Para o aplicativo React Native, utilize o ambiente de desenvolvimento compatível com seu sistema operacional.

## Contribuição

Contribuições são bem-vindas! Se você deseja contribuir com o projeto, por favor, abra uma "issue" para discutir suas ideias e sugestões ou envie um "pull request" com suas melhorias.

## Licença

Este projeto está sob a Licença MIT.

## Contato
Em caso de dúvidas ou mais informações, entre em contato comigo:

Zezerino Mattos - mattoszz@hotmail.com