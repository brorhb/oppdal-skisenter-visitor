import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:visitor/src/config.dart';
import 'package:visitor/src/providers/TracksProvider/repository.dart';

class TracksApi implements Source {
  Config _config = Config();

  Future<List<dynamic>> fetch() async {
    try {
      http.Response response = await http.get("${_config.baseurl}/tracks");
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception(response);
      }
    } catch (err) {
      print(err);
      return null;
    }
  }
}
