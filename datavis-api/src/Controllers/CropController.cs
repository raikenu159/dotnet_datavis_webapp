using DatavisApi.Dto;
using Microsoft.AspNetCore.Mvc;
using DatavisApi.Services;

namespace DatavisApi.Controllers;

[Route("crop-api")]
[ApiController]
public class CropController : ControllerBase
{
    private CropService _cropService;

    public CropController(CropService cropService)
    {
        _cropService = cropService;
    }

    [HttpGet("countries")]
    [ProducesResponseType(200, Type = typeof(ICollection<CountryDto>))]
    public IActionResult GetCountries()
    {
        ICollection<CountryDto> countriesDto = _cropService.GetCountriesDto();

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        return Ok(countriesDto);
    }

    [HttpGet("crops")]
    [ProducesResponseType(200, Type = typeof(ICollection<CropDto>))]
    public IActionResult GetCrops()
    {
        ICollection<CropDto> cropsDto = _cropService.GetCropsDto();

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        return Ok(cropsDto);
    }


    [HttpGet("years-min")]
    [ProducesResponseType(200, Type = typeof(int))]
    public IActionResult GetMinYearValue()
    {
        int minYearValue = _cropService.GetMinYearValue();

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        return Ok(minYearValue);
    }

    [HttpGet("years-max")]
    [ProducesResponseType(200, Type = typeof(int))]
    public IActionResult GetMaxYearValue()
    {
        int minYearValue = _cropService.GetMaxYearValue();

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        return Ok(minYearValue);
    }

    // Endpoint for crop yield line chart data; returns crop yield data for given countries and crop
    [HttpGet("cropyields/countries/crop")]
    [ProducesResponseType(200, Type = typeof(ICollection<CropYieldDto>))]
    public IActionResult GetCropYieldsByCountriesAndCrop
    (
        [FromQuery] int[] countryIds,
        [FromQuery] int cropId
    )
    {

        ICollection<CropYieldDto> cropYieldsDto = _cropService.GetCropYieldsDtoByCountriesAndCrop(countryIds, cropId);

        if (!ModelState.IsValid) return BadRequest(ModelState);

        return Ok(cropYieldsDto);
    }

    // Endpoint for crop yield pie chart data
    [HttpGet("cropyields/crop/yearrange")]
    [ProducesResponseType(200, Type = typeof(ICollection<CountryYieldSum>))]
    public IActionResult GetCountryYieldSumByYearRangeAndCrop(int yearStart, int yearEnd, int cropId)
    {
        ICollection<CountryYieldSum> countryYields = _cropService.GetCountryYieldSumByYearRangeAndCrop(yearStart, yearEnd, cropId);
        if (!ModelState.IsValid) return BadRequest(ModelState);

        return Ok(countryYields);
    }
}