# Farol do Investimento API

API FastAPI para servir dados financeiros e outros recursos do Farol do Investimento a partir do OCI Object Storage.

## Estrutura

```
app/
├── main.py              # Aplicação FastAPI principal
├── oci_client.py        # Cliente OCI com cache
└── routers/
    └── indices.py       # Router para endpoints de índices
    └── ...              # Outros routers conforme necessário
```

## Configuração

### Desenvolvimento
1. Configure as credenciais OCI em `oci/config`
2. Coloque a chave privada em `oci/oci_key.pem`

### Produção
- Executa em Docker no Kubernetes
- Credenciais OCI fornecidas via Kubernetes Secret

## Execução

### Desenvolvimento
```bash
ENV=development uv run -- fastapi dev --app app --reload
```
- Swagger UI disponível em `/docs`
- Permite requisições de localhost

### Produção
```bash
uv run fastapi run main.py
```
- Executa em container Docker no Kubernetes
- Swagger UI desabilitado
- CORS restrito a `faroldoinvestimento.com.br`
- Credenciais OCI via Kubernetes Secret

## Endpoints

### Índices
- `GET /api/v1/indices` - Retorna dados do arquivo `latest.json` do bucket `indices`

### Outros endpoints
- Novos endpoints serão adicionados conforme a necessidade

## Cache

Os dados são cached em memória por 2 horas para otimizar performance.