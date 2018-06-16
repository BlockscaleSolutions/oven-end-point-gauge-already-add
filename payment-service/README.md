# Running locally

## start mssql server

```PowerShell
docker run -it --rm `
    -p 9000:1433 `
    -e ACCEPT_EULA=Y `
    -e SA_PASSWORD=!1secret `
    --name mssql store/microsoft/mssql-server-linux:2017-latest
```

## set environment variables

```PowerShell
$env:ASPNETCORE_ENVIRONMENT="development"

$env:JWT:pk="d9cb337509cb7565ff2bc3ade6f0a686d4aa0c37bb0a79eb071f4c372c0db58d"
$env:JWT:issuer="---jwt-issuer---"
$env:JWT:audience="all"

$env:stripe:SecretKey="sk_test_BQokikJOvBiI2HlWgH4olfQ2"
$env:stripe:PublishableKey="pk_test_g6do5S237ekq10r65BnxO6S0"

$env:ConnectionStrings:identity=";Data Source=(local),9000;Integrated Security=false;User Id=sa;Password=!1secret;Initial Catalog=AspNetIdentity;"
```

# Build docker image

```PowerShell
docker build -t payment-service-dev .
```

# Run

```PowerShell
docker run -it --rm
```
