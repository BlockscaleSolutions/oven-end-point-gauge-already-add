using System.Threading.Tasks;
using AuthService.Dtos;

namespace AuthService.Services
{
    public interface IRegistryService
    {
        Task Register(RegistryDto model);
    }
}