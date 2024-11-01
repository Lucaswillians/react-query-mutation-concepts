# Mutations e Testes com React Query 🚀

Este repositório explora o uso de **mutations no React Query** e a implementação de **testes unitários** em queries, utilizando hooks customizados para simular e validar diferentes cenários de consumo de dados.

## Pré-requisitos

Para executar o projeto corretamente, você precisa ter o **Docker** instalado em sua máquina para rodar os serviços necessários via Docker Compose.

### Configurando o Ambiente

1. **Suba os Serviços com Docker Compose**:
    ```bash
    docker-compose up
    ```

   Isso iniciará os serviços exigidos pelo projeto, permitindo que você execute o backend em um contêiner Docker. Aguarde até que todos os contêineres estejam ativos antes de seguir para a próxima etapa.

2. **Instale as Dependências**:
    ```bash
    yarn
    ```

3. **Execute o Projeto**:
    ```bash
    yarn dev
    ```

O projeto agora deve estar acessível localmente.

## Funcionalidades Principais

Este repositório destaca conceitos e práticas avançadas de **React Query**, com foco em:

- **Mutations**: Gerenciamento de operações de criação, atualização e exclusão de dados assíncronos.
- **Custom Hooks**: Implementação de hooks customizados para encapsular lógica de mutations e queries, facilitando a reutilização e manutenção do código.
- **Testes Unitários**: Configuração de testes para garantir o comportamento esperado das queries e mutations.

## Testes

Para executar os testes unitários:

```bash
yarn test
