using System;
using System.Reflection;
using AuthService.Services;
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
                .AddIdentity<IdentityUser, IdentityRole>(options =>
                {
                    options.Lockout.AllowedForNewUsers = true;
                    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                    options.Lockout.MaxFailedAccessAttempts = 5;
                    //
                    options.Password.RequireDigit = true;
                    options.Password.RequiredLength = 8;
                    options.Password.RequiredUniqueChars = 1;
                    options.Password.RequireLowercase = true;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = false;
                    //
                    options.User.RequireUniqueEmail = false;
                })
                .AddEntityFrameworkStores<IdentityDbContext>();

            services.AddScoped<
                IUserStore<IdentityUser>,
                UserOnlyStore<IdentityUser, IdentityDbContext>
            >();

            services.AddScoped<IRegistryService, RegistryService>();
            services.AddScoped<ISignInService, SignInService>();
            services.AddScoped<ITokenService, TokenService>();

            services.AddCors(options =>
                options.AddPolicy("AllowAnyOrigin", builder =>
                    builder
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowAnyOrigin()
                )
            );

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

            app.UseCors("AllowAnyOrigin");

            app.UseMvc();
        }
    }
}
