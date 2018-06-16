# Running locally

## prerequisites

have mssql-dev running

## set environment variables

```PowerShell
$env:ASPNETCORE_ENVIRONMENT="development"

$env:JWT:pk="d9cb337509cb7565ff2bc3ade6f0a686d4aa0c37bb0a79eb071f4c372c0db58d"
$env:JWT:AllottedMinutes="60"
$env:JWT:issuer="---jwt-issuer---"
$env:JWT:audience="all"

$env:ConnectionStrings:identity=";Data Source=(local),9000;Integrated Security=false;User Id=sa;Password=!1secret;Initial Catalog=AspNetIdentity;"
```

# Build docker image

```PowerShell
docker build -t auth-service-dev .
```

# Run

```PowerShell
docker run -it --rm `
    -p 9001:80 `
    --name auth-service-dev auth-service-dev
```
