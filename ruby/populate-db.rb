require 'meilisearch'
require 'json'
require 'ffaker'
require 'securerandom'

require 'optparse'


@options = {:separator => ";", :localization => 'EN'}
parser = OptionParser.new do |opts|
	opts.banner = "Usage: pouplate-db.rb [options]"
	opts.on("-r", "--records [number of records]", Integer, "[Required] Setup number of generated records") do |records|
		@options[:records] = records
  end
  opts.on("-k", "--key [master key]", String, "[Required] Master key to connect to database") do |key|
  		@options[:key] = key
    end
	opts.on("-c", "--cso [number of CSO]", Integer, "Setup number of generated CSO entries") do |cso|
		@options[:cso] = cso
	end
	opts.on("-l", "--localization [Localization code]", String, "Localization used for generating names etc. (EN, UA, FR, IT, AR)") do |localization|
		@options[:localization] = localization
	end
	opts.on_tail("-h", "--help", "Show this message") do
		puts opts
		exit
	end
end

parser.parse!

if @options[:records].nil?
	puts parser
	exit
end

if @options[:key].nil?
	puts parser
	exit
end


@name_generators = {
	"EN" => FFaker::Name,
	"UA" => FFaker::NameUA,
	"FR" => FFaker::NameFR,
	"IT" => FFaker::NameIT,
	"DE" => FFaker::NameDE,
	"AR" => FFaker::NameAR,
}


@livelihoods = ['Irregular earnings', 'Farming - Agriculture', 'Farming - Livestock', 'Social welfare', 'Pension', 'Home Duties', 'Own business/trading', 'No Income']
@vulnerabilities = ['disabled', 'solo parent', 'lactating', 'pregnant', 'nutritional issues', 'chronically ill']
@id_types = ['National ID','Passport','Family Registration','Birth Certificate','Driver’s License','Camp ID','Social Service Card','Other']
@phone_types = ['Mobile', 'Landline']
adm1 = ['Avtonomna Respublika Krym']
@gender = ['Male', 'Female']
@shelter_status = ['Tent', 'Makeshift Shelter', 'Transitional Shelter', 'House/Apartment - Severely Damaged', 'House/Apartment - Moderately Damaged', 'House/Apartment - Not Damaged', 'Room or Space in Public Building', 'Room or Space in Unfinished Building', 'House/Apartment - Lightly Damaged', 'Other']
support = ['MPCA', 'Cash for Work', 'Food Kit', 'Food Voucher', 'Hygiene Kit', 'Shelter Kit', 'Non Food Items', 'Other']
@assets = ['A/C', 'Agricultural Land', 'Car', 'Flatscreen TV', 'Livestock', 'Motorbike', 'Washing Machine']
@residency_status = ['resident', 'IDP', 'refugee']




def create_mock_household(id)
	prng = Random.new
	members = Array.new(prng.rand(2) + 4) { generate_member(false)}
	members << generate_member(true)
	{
	  id: SecureRandom.uuid,
		iso3: ["KHM","UKR","SYR"].sample,
		livelihood: @livelihoods.sample,
		assets: [
			@assets.sample
		],
		shelterStatus: @shelter_status.sample,
		projectIds: [
			1,
			8
		],
		notes: FFaker::Lorem::phrase,
		_geo: {
      lat: FFaker::Geolocation::lat,
      lng: FFaker::Geolocation::lng
		},
		members: members,
		incomeLevel: prng.rand(10),
		foodConsumptionScore: prng.rand(10),
		copingStrategiesIndex: prng.rand(10),
		debtLevel: prng.rand(10),
		supportDateReceived: nil,
		supportReceivedTypes: [
			"Livelihoods Support"
		],
		supportOrganizationName: nil,
		incomeSpentOnFood: prng.rand(100000),
		houseIncome: prng.rand(100000),
		cso: generate_cso,
		residenceAddress: {
			number: prng.rand(700)+1,
			street: FFaker::Address::street_name,
			postcode: prng.rand(100000),
			locationId: 26
		}
	}
end

def generate_member(head)
	prng = Random.new
	last_name_en = FFaker::Name::last_name
	last_name_local = @name_generators[@options[:localization]]::last_name
	first_name_en =  FFaker::Name::first_name
	first_name_local = @name_generators[@options[:localization]]::first_name
	{
		dateOfBirth: FFaker::Time::between('1-1-1940', '1-1-2023'),
		localFamilyName: last_name_local,
		localGivenName: first_name_local,
		localParentsName: last_name_local,
		enFamilyName: last_name_en,
		enGivenName: first_name_en,
		enParentsName: last_name_en,
		head: head,
		gender: @gender.sample,
		phones: [
			{
				number: "#{FFaker::PhoneNumber::phone_calling_code} #{FFaker::PhoneNumberPL::mobile_phone_number}",
				type: @phone_types.sample,
				proxy: false
			}
		],
		residencyStatus: @residency_status.sample,
		isHead: true,
		vulnerabilityCriteria: Array.new(prng.rand(2)) { @vulnerabilities.sample },
		nationalIdCards: [
			{
				number: "#{FFaker::Address::country_code}-#{FFaker::Code::npi}",
				type: @id_types.sample,
				priority: 1
			}
		]
	}
end

def generate_cso
	prng = Random.new
	number_of_cso = @options[:cso] ? @options[:cso] : 1
	cso = {}
	(1..number_of_cso).each { |i|
		value = FFaker::FreedomIpsum.word
		if i % 3 == 0
			value = prng.rand(100000)
		end
		if i % 5 == 0
			value = FFaker::Boolean.random
		end
		if i % 7 == 0
			value = Array.new(prng.rand(5)) { FFaker::FreedomIpsum.word }
		end
		cso["cso#{i}"] = value
	}
	cso
end


def populate_database(number_of_documents, index)
	documents = []
	puts "populating with #{number_of_documents}"
	(1..number_of_documents).each { |i|
		documents << create_mock_household(i)
		if i % 1000 == 0
			index.add_documents(documents)
			documents = []
			puts "Documents inserted #{i}"
		end
	}
	index.add_documents(documents)
end


client = MeiliSearch::Client.new('http://meilisearch:7700', @options[:key])
populate_database(@options[:records], client.index('households'))
