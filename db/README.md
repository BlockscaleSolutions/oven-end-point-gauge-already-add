# MSSQL

## build & run container

```PowerShell
docker run `
    -p 9000:1433 `
    -e ACCEPT_EULA=Y `
    -e SA_PASSWORD=!1secret `
    --name mssql-dev store/microsoft/mssql-server-linux:2017-latest
```

## copy scripts

```PowerShell
docker cp scripts mssql-dev:/sql_scripts
```

## execute scripts

```PowerShell
docker exec -it mssql-dev /opt/mssql-tools/bin/sqlcmd -U sa -P !1secret -i /_sql_scripts/db_AspNetIdentity.sql
```
