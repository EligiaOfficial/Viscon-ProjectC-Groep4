namespace ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding;

[AttributeUsageAttribute(
    System.AttributeTargets.Parameter | System.AttributeTargets.Property,
    AllowMultiple=false, Inherited=true
)]
public class FromClaimAttribute :
    System.Attribute,
    Microsoft.AspNetCore.Http.Metadata.IFromQueryMetadata,
    Microsoft.AspNetCore.Mvc.ModelBinding.IBindingSourceMetadata,
    Microsoft.AspNetCore.Mvc.ModelBinding.IModelNameProvider
 {
    public FromClaimAttribute() {}

    public Microsoft.AspNetCore.Mvc.ModelBinding.BindingSource? BindingSource {
        get => ClaimBindingSource.ClaimBinding;
    }

    public string? Name { get; set; }
}
