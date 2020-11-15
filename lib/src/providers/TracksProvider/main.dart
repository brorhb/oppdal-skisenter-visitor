import 'package:flutter/material.dart';
import 'package:visitor/src/models/Track.dart';
import 'package:visitor/src/providers/TracksProvider/repository.dart';

class TracksProvider with ChangeNotifier {
  TracksRepository _repository = TracksRepository();
  List<Track> _tracks;
  List<Track> get tracks => _tracks;
  set tracks(List<Track> val) {
    print(val);
    _tracks = val;
    notifyListeners();
  }

  Future fetch() async {
    List<Track> _tracks = await _repository.fetch();
    tracks = _tracks;
  }
}
