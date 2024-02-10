FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /App

# Copy everything
COPY *.sln ./
COPY *.props ./
COPY *global.json ./
COPY ./Inlog.Desafio.Backend.Application/*.csproj ./Inlog.Desafio.Backend.Application/
COPY ./Inlog.Desafio.Backend.Domain/*.csproj ./Inlog.Desafio.Backend.Domain/
COPY ./Inlog.Desafio.Backend.Infra.Database/*.csproj ./Inlog.Desafio.Backend.Infra.Database/
COPY ./Inlog.Desafio.Backend.Test/*.csproj ./Inlog.Desafio.Backend.Test/
COPY ./Inlog.Desafio.Backend.WebApi/*.csproj ./Inlog.Desafio.Backend.WebApi/
COPY . ./

# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /App
COPY --from=build-env /App/out .
ENTRYPOINT ["dotnet", "Inlog.Desafio.Backend.WebApi.dll"]