import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';
import 'package:visitor/src/models/Track.dart';
import 'package:visitor/src/providers/TracksProvider/api.dart';

class TracksRepository {
  TracksApi _tracksApi = TracksApi();
  List<Source> sources = [];
  List<Cache> caches = [];

  TracksRepository() {
    TracksCache _tracksCache = TracksCache();
    sources = [_tracksApi, _tracksCache];
  }

  Future<List<Track>> fetch() async {
    List<dynamic> response;
    var source, cache;
    for (source in sources) {
      response = await source.fetch();
      if (response != null) break;
    }
    for (cache in caches) {
      if (source != cache) cache.insert(map: response);
    }
    if (response == null) return null;
    return response.map((item) => Track.fromJson(item)).toList();
  }
}

class TracksCache implements Cache, Source {
  String _key = "tracks";
  SharedPreferences _sharedPreferences;

  Future<SharedPreferences> get sharedPreferences async {
    if (_sharedPreferences != null)
      return _sharedPreferences;
    else {
      _sharedPreferences = await _init();
      return _sharedPreferences;
    }
  }

  Future<SharedPreferences> _init() async {
    return SharedPreferences.getInstance();
  }

  @override
  Future clear() async {
    (await sharedPreferences).setString(_key, null);
  }

  @override
  Future insert({List<dynamic> items}) async {
    if (items == null) return;
    (await sharedPreferences).setString(_key, jsonEncode(items));
  }

  @override
  Future<List<dynamic>> fetch() async {
    String json = (await sharedPreferences).getString(_key);
    if (json == null) return null;
    return jsonDecode(json);
  }
}

abstract class Source {
  Future<List<dynamic>> fetch();
}

abstract class Cache {
  Future clear();
  Future insert({List<dynamic> items});
}
