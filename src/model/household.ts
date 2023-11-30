export interface Household {

  id: number,
  iso3: string,
  livelihood: string,
  assets: string[]
  shelterStatus: string,
  projectIds: number[]
  notes: string,
  _geo: {
    lng: number,
    lat: number,
  }
  members: Member[],
  incomeLevel: number,
  foodConsumptionScore: number,
  copingStrategiesIndex: number,
  debtLevel: number,
  supportDateReceived: string,
  supportReceivedTypes: string[]
  supportOrganizationName: string,
  incomeSpentOnFood: number,
  houseIncome: number,
  cso: unknown,
  residenceAddress: {
    number: number,
    street: string,
    postcode: number,
    locationId: number
  }
  _formatted?: Household
}

export interface Member {

  dateOfBirth: string,
  localFamilyName: string,
  localGivenName: string,
  localParentsName: string,
  enFamilyName: string,
  enGivenName: string,
  enParentsName: string,
  head: boolean,
  gender: string,
  phones:
  {
    number: string,
    type: string,
    proxy: boolean
  }[]
,
  residencyStatus: string,
  isHead: boolean,
  vulnerabilityCriteria: string[]
  nationalIdCards:
  {
    number: string,
    type: string,
    priority: number
  }[]


}
