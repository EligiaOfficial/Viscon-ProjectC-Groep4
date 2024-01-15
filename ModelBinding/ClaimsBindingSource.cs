using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ModelBinding;

public class ClaimBindingSource {
    public static BindingSource ClaimBinding {
        get => new BindingSource("Claim", "BindingSource_Claim", false, true);
    }
}
