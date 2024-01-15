using System.Security.Claims;
using System.Globalization;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ModelBinding;

public class ClaimValueProviderFactory : IValueProviderFactory {
    public Task CreateValueProviderAsync(ValueProviderFactoryContext context) {
        _ = context ?? throw new ArgumentNullException(nameof(context));
        var claims = context.ActionContext.HttpContext.User;
        if (claims is not null) {
            var valueProvider = new ClaimValueProvider(
                ClaimBindingSource.ClaimBinding,
                claims,
                CultureInfo.InvariantCulture
            );

            context.ValueProviders.Add(valueProvider);
        }
        return Task.CompletedTask;
    }
}
