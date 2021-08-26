<h1 align="center">
  Projeto de Seleção para App Masters
</h1>

<p align="center">
  <a href="https://api-steam-diener.herokuapp.com/" target="_blank">API-Steam-Diener</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="http://appmasters.io/" target="_blank">App Masters</a>
</p>

## Sobre o Projeto

Repositório destinado ao projeto de seleção para estágio na App Masters, cuja função é desenvolver um backend que fornece os jogos da steam, e permite o cliente (um possível frontend), buscar um jogo, obter mais informações, favoritar e avaliar seus itens preferidos.

## Requisitos

- [Node](https://nodejs.org/)
- API Client [e.g. [Postman](https://postman.com), [Insomnia](https://insomnia.rest/)]
- [Postgres](https://www.postgresql.org/)

## Como Executar

- Instale as dependências com `yarn`
- Configure um arquivo .env seguindo [.env.example](.env.example)
- Inicie o servidor com `yarn dev`

Agora você pode acessar `localhost:` com a `porta` escolhida pelo API Client escolhido.

### Rotas

**`GET`** em `/` Retorna todos jogos listados pela [API da Steam](https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json)

**`GET`** em `/:id` Retorna informações completas sobre o jogo

**`POST`** em `/favorite` Inclui jogo como favorito

- ### Body

  - `rating`
  - `appId`

**`GET`** em `/favorite` Retorna todos jogos salvos pelo usuário

**`DELETE`** em `/favorite/:id` Exclui jogo selecionado da lista de favoritos

Para rotas `/favorite` é necessário conter um `user-hash` em `request.headers` para autenticação de usuário.

---

Feito por [Diener Dornelas](https://github.com/dienerld)
