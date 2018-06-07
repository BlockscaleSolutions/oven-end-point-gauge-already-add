using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AuthService
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            var migration_assembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;

            services.AddDbContext<IdentityDbContext>(
                options =>
                    options.UseSqlServer(
                        this.Configuration.GetConnectionString("identity"),
                        sql => sql.MigrationsAssembly(migration_assembly))
            );

            services
                .AddIdentity<IdentityUser, IdentityRole>(options => { })
                .AddEntityFrameworkStores<IdentityDbContext>();

            services.AddScoped<
                IUserStore<IdentityUser>,
                UserOnlyStore<IdentityUser, IdentityDbContext>
            >();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();
            else
            {
                app.UseHsts();
                app.UseHttpsRedirection();
            }

            app.UseMvc();
        }
    }
}
