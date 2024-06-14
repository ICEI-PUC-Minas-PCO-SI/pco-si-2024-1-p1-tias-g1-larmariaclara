using GestaoLMC.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Configuration;
using System.Data;
using System.Windows;

namespace GestaoLMC.App;

/// <summary>
/// Interaction logic for App.xaml
/// </summary>
public partial class App : Application
{
    public App()
    {
        HostApplicationBuilder builder = Host.CreateApplicationBuilder();

        IConfiguration configuration = builder.Configuration;

        builder.Services.AddInfrastructure(configuration);
        builder.Services.AddMediatR(x => x.RegisterServicesFromAssemblies(AppDomain.CurrentDomain.GetAssemblies()));

        IHost host = builder.Build();

        host.UseSerilog();
        host.Run();
    }

    

    //builder.Services.AddTransient<IExampleTransientService, ExampleTransientService>();
    //builder.Services.AddScoped<IExampleScopedService, ExampleScopedService>();
    //builder.Services.AddSingleton<IExampleSingletonService, ExampleSingletonService>();
    //builder.Services.AddTransient<ServiceLifetimeReporter>();

    

    //ExemplifyServiceLifetime(host.Services, "Lifetime 1");
    //ExemplifyServiceLifetime(host.Services, "Lifetime 2");

    //await host.RunAsync();

    static void ExemplifyServiceLifetime(IServiceProvider hostProvider, string lifetime)
    {
        //using IServiceScope serviceScope = hostProvider.CreateScope();
        //IServiceProvider provider = serviceScope.ServiceProvider;
        //ServiceLifetimeReporter logger = provider.GetRequiredService<ServiceLifetimeReporter>();
        //logger.ReportServiceLifetimeDetails(
        //    $"{lifetime}: Call 1 to provider.GetRequiredService<ServiceLifetimeReporter>()");

        //Console.WriteLine("...");

        //logger = provider.GetRequiredService<ServiceLifetimeReporter>();
        //logger.ReportServiceLifetimeDetails(
        //    $"{lifetime}: Call 2 to provider.GetRequiredService<ServiceLifetimeReporter>()");

        Console.WriteLine();
    }
}

