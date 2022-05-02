package trip

import trippb "coolcar/proto/gen/go"
import "context"

// Service implements trip service.
type Service struct{}

func (*Service)GetTrip(c context.Context,
	 req *trippb.GetTripRequest) (*trippb.GetTripResponse, error){
		 return &trippb.GetTripResponse{
			 Id: req.Id,
			 Trip: &trippb.Trip{
				Start:"abc",
				End: "def",
				DurationSec: 3600,
				FeeCent: 10000,
				StartPos: &trippb.Location{
					Latitude: 30,
					Longitude: 120,
				},
				EndPos: &trippb.Location{
					Latitude: 35,
					Longitude: 125,
				},
				PathLocations: []*trippb.Location{
					{
						Latitude: 32,
						Longitude: 122,
					},
					{
						Latitude: 34,
						Longitude: 124,
					},
				},
				Status: trippb.TripStatus_NOT_STARTED, //这里是0就不显示了 当成空的了
			},
		 },nil
	 }