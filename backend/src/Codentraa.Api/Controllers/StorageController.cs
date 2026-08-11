using Microsoft.AspNetCore.Mvc;

namespace Codentraa.Api.Controllers;

[ApiController]
[Route("api/v1/storage")]
public class StorageController : ControllerBase
{
    public record PreSignedUrlRequest(string FileName, string ContentType, long FileSizeBytes);

    [HttpPost("presigned-url")]
    public IActionResult GeneratePreSignedUrl([FromBody] PreSignedUrlRequest request)
    {
        if (request.FileSizeBytes > 50 * 1024 * 1024) // 50MB Limit
        {
            return BadRequest(new { Message = "File size exceeds the 50MB limit." });
        }

        var uniqueFileName = $"{Guid.NewGuid()}_{request.FileName}";
        var mockS3PreSignedUrl = $"https://s3.amazonaws.com/codentraa-uploads/{uniqueFileName}?AWSAccessKeyId=AKIAIOSFODNN7EXAMPLE&Signature=vjL2bnNi6a55j455e%3D&Expires=1786468082";

        return Ok(new
        {
            UploadUrl = mockS3PreSignedUrl,
            FileKey = uniqueFileName,
            PublicUrl = $"https://codentraa-uploads.s3.amazonaws.com/{uniqueFileName}",
            ExpiresInSeconds = 3600
        });
    }
}
