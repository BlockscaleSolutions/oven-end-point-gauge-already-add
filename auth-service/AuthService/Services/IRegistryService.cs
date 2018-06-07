using System.Threading.Tasks;
using AuthService.Models;

namespace AuthService.Services
{
    public interface IRegistryService
    {
        Task Register(RegistryModel model);
    }
}