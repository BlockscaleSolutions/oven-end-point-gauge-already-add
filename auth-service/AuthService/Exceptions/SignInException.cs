namespace AuthService.Exceptions
{
    public class SignInException : System.Exception
    {
        public SignInException(string message) : base(message) { }
    }
}