namespace BarberApp.Domain.Models
{
    public class ChangePassword
    {
        public bool IsRequired { get; set; }
        public DateTime LastChange { get; set; }
        public string OldPassword { get; set; }
        public string OldPasswordSalt { get; set; }
    }
}
