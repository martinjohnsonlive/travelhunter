import React, { useState } from 'react';
import { Plane, Calendar, Users, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

type TripType = 'oneWay' | 'roundTrip' | 'multiCity';
type TravelClass = 'economy' | 'premiumEconomy' | 'business' | 'firstClass';

const FlightSearch: React.FC = () => {
  const [tripType, setTripType] = useState<TripType>('oneWay');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [travelers, setTravelers] = useState(1);
  const [travelClass, setTravelClass] = useState<TravelClass>('economy');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ tripType, fromLocation, toLocation, departureDate, returnDate, travelers, travelClass });
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex space-x-4 mb-6">
        <Button
          type="button"
          variant={tripType === 'oneWay' ? 'default' : 'outline'}
          onClick={() => setTripType('oneWay')}
          className="flex-1"
        >
          One Way
        </Button>
        <Button
          type="button"
          variant={tripType === 'roundTrip' ? 'default' : 'outline'}
          onClick={() => setTripType('roundTrip')}
          className="flex-1"
        >
          Round Trip
        </Button>
        <Button
          type="button"
          variant={tripType === 'multiCity' ? 'default' : 'outline'}
          onClick={() => setTripType('multiCity')}
          className="flex-1"
        >
          Multi City
        </Button>
      </div>

      <form onSubmit={handleSearch} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="from">From</Label>
            <div className="relative">
              <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                id="from"
                placeholder="Departure City"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <ArrowRight className="text-gray-400" size={24} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="to">To</Label>
            <div className="relative">
              <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                id="to"
                placeholder="Arrival City"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="departure">Departure Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal ${
                    !departureDate && "text-muted-foreground"
                  }`}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {departureDate ? format(departureDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={departureDate}
                  onSelect={setDepartureDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          {tripType === 'roundTrip' && (
            <div className="space-y-2">
              <Label htmlFor="return">Return Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal ${
                      !returnDate && "text-muted-foreground"
                    }`}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {returnDate ? format(returnDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="travelers">Travellers & Class</Label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  id="travelers"
                  type="number"
                  min="1"
                  value={travelers}
                  onChange={(e) => setTravelers(parseInt(e.target.value))}
                  className="pl-10"
                />
              </div>
              <Select value={travelClass} onValueChange={(value: TravelClass) => setTravelClass(value)}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="premiumEconomy">Premium Economy</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="firstClass">First Class</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="nonStop" className="rounded text-primary focus:ring-primary" />
            <Label htmlFor="nonStop">Non-Stop Flights</Label>
          </div>
          <Button type="submit" className="px-8">
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FlightSearch;