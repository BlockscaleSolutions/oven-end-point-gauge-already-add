FROM microsoft/dotnet:2.1-sdk

EXPOSE 80/tcp


ENV ASPNETCORE_ENVIRONMENT="development"

ENV JWT:pk="d9cb337509cb7565ff2bc3ade6f0a686d4aa0c37bb0a79eb071f4c372c0db58d"
ENV JWT:issuer="---jwt-issuer---"
ENV JWT:audience="all"

ENV stripe:SecretKey="sk_test_BQokikJOvBiI2HlWgH4olfQ2"
ENV stripe:PublishableKey="pk_test_g6do5S237ekq10r65BnxO6S0"

ENV ConnectionStrings:identity=";Data Source=(local),9000;Integrated Security=false;User Id=sa;Password=!1secret;Initial Catalog=AspNetIdentity;"


WORKDIR /app

# copy and build
COPY PaymentService ./
RUN dotnet publish -c Release -o out

ENTRYPOINT ["dotnet", "out/PaymentService.dll"]
