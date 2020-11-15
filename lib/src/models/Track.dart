import 'package:visitor/src/models/Difficulty.dart';
import 'package:visitor/src/models/EnumValues.dart';
import 'package:visitor/src/models/Status.dart';

class Track {
  Track({
    this.id,
    this.name,
    this.connectedTracks,
    this.season,
    this.status,
    this.length,
    this.difficulty,
    this.lifts,
  });

  int id;
  String name;
  dynamic connectedTracks;
  dynamic season;
  Status status;
  int length;
  Difficulty difficulty;
  dynamic lifts;

  factory Track.fromJson(Map<String, dynamic> json) => Track(
        id: json["id"],
        name: json["name"],
        connectedTracks: json["connected_tracks"],
        season: json["season"],
        status: _statusValues.map[json["status"]],
        length: json["length"],
        difficulty: _difficultyValues.map[json["difficulty"]],
        lifts: json["lifts"],
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "name": name,
        "connected_tracks": connectedTracks,
        "season": season,
        "status": _statusValues.reverse[status],
        "length": length,
        "difficulty": _difficultyValues.reverse[difficulty],
        "lifts": lifts,
      };
}

final _difficultyValues = EnumValues({
  "advanced": Difficulty.ADVANCED,
  "beginner": Difficulty.BEGINNER,
  "expert": Difficulty.EXPERT,
  "intermediate": Difficulty.INTERMEDIATE,
  "not rated": Difficulty.NOT_RATED,
  "terrainpark": Difficulty.TERRAINPARK
});

final _statusValues = EnumValues({
  "closed": Status.CLOSED,
  "open": Status.OPEN,
  "maintainance": Status.MAINTAINANCE
});
