FROM microsoft/dotnet:2.1-sdk

EXPOSE 80/tcp


ENV ASPNETCORE_ENVIRONMENT="development"


WORKDIR /app

# copy and build
COPY LoanService ./
RUN dotnet publish -c Release -o out

ENTRYPOINT ["dotnet", "out/LoanService.dll"]
