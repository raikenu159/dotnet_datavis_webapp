using DatavisApi.Models;

namespace DatavisApi.Interfaces;

public interface ICropRepository
{
    bool CropIdExists(int cropId);
    IOrderedQueryable<Crop> GetCrops();
    bool CountryIdExists(int countryId);
    IOrderedQueryable<Country> GetCountries();
    bool YearIdExists(int yearId);
    IOrderedQueryable<Year> GetYears();

    IOrderedQueryable<CropYield> GetCropYieldsByCountry(int countryId);
    IOrderedQueryable<CropYield> GetCropYieldsByYear(int yearId);
    IOrderedQueryable<CropYield> GetCropYieldsByCrop(int cropId);
    IOrderedQueryable<CropYield> GetCropYieldsByCountriesAndCrop(int[] countryIds, int cropId);
    IOrderedQueryable<CropYield> GetCropYieldsWithinYearRangeByCrop(int yearStart, int yearEnd, int cropId);
}