# Running locally

## set environment variables

```PowerShell
$env:ASPNETCORE_ENVIRONMENT="development"
```

# Build docker image

```PowerShell
docker build -t loan-service-dev .
```

# Run

```PowerShell
docker run -it --rm `
    -p 9001:80 `
    --name loan-service-dev loan-service-dev
```
