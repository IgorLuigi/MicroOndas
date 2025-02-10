using MicroOndas_Back.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IMicroondasService, MicroondasService>();

builder.Services.AddOpenApi();

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.MapGet("/", () => "Bem-vindo à API MicroOndas-Back!");

app.MapControllers();

app.Run();
