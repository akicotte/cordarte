# Site Cordarte Móveis — vitrine + painel (sem cartão)

1. **Banco:** Cloudflare > Storage & Databases > D1 > Create database `cordarte`. Copie o Database ID. Na aba Console, execute o conteúdo de `schema.sql` e depois o de `seed.sql` (30 produtos de rascunho).
2. **Configuração:** em `wrangler.toml`, troque `COLE_AQUI_O_ID_DO_BANCO` pelo ID.
3. **GitHub:** crie um repositório e envie o CONTEÚDO desta pasta.
4. **Pages:** Workers & Pages > Create > Pages > Connect to Git. Build em branco, saída `public`.
5. **Senha do painel:** projeto Pages > Settings > Variables and Secrets > crie `ADMIN_PASSWORD` (tipo Secret) com uma senha longa (16+ caracteres). Refaça o deploy.
6. **Usar:** acesse `seudominio/admin`, entre com a senha, edite os produtos e envie as fotos (ficam guardadas no próprio banco). No Google Search Console, envie `seudominio/sitemap.xml`.

## Atualização: categorias e novos campos
- Banco já existente: rode o `migracao.sql` no Console do D1 (uma vez). Banco novo: o `schema.sql` já traz tudo.
- No painel: crie as categorias em "Nova categoria" e escolha uma em cada produto. Cada categoria ganha a página `/categoria/nome`.

## Atualização: frete por estado e peso
- Banco existente: rode o `migracao2.sql` no Console do D1 (uma vez). Banco novo: `schema.sql` e `seed.sql` já incluem tudo.
- No painel: "Tabela de frete" (valor base + valor por kg + prazo por estado) e o campo "Peso" em cada produto. Produto sem peso não mostra o cálculo de frete.
