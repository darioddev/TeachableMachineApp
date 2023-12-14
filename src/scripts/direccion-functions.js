import { postData, getData } from './axios-function.js'

export const loadProvinces = async (selectCountry) => {
  try {
    const responseProvinces = await postData(
      'https://countriesnow.space/api/v0.1/countries/states',
      {
        country: selectCountry
      }
    )

    return responseProvinces.data.states
  } catch (error) {
    console.error('Error al obtener la lista de provincias:', error)
    throw error
  }
}

export const loadCities = async (selectCountry) => {
  try {
    const responseCities = await postData('https://countriesnow.space/api/v0.1/countries/cities', {
      country: selectCountry
    })

    return responseCities.data
  } catch (error) {
    console.error('Error al obtener la lista de ciudades:', error)
    throw error
  }
}

export const loadCountries = async () => {
  try {
    const countries = await getData('https://restcountries.com/v3.1/all')
    const formattedCountries = countries.map((country) => ({
      value: country.name.common,
      text: country.name.common,
      flagImageSrc: country.flags.svg
    }))

    return formattedCountries
  } catch (error) {
    console.error('Error al obtener la lista de países:', error)
    throw error
  }
}
