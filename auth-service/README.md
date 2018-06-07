```PowerShell
docker run -it --rm `
    -p 1433:1433 `
    -e ACCEPT_EULA=Y `
    -e SA_PASSWORD=!1secret `
    --name identity store/microsoft/mssql-server-linux:2017-latest

$env:ASPNETCORE_ENVIRONMENT="development"

$env:ConnectionStrings:identity=";Data Source=(local);Integrated Security=true;Initial Catalog=AspNetIdentity;"
```
