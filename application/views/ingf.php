<section class="resume-section p-3" style="align-items : normal !important" id="experience">
    <div class="resume-section-content">
        <div class="row">
            <div class="col-sm-6">
                <h3 class="mb-1">INPUT BARANG DI GUDANG (GATE IN)</h3>
            </div>
            <div class="col-sm-6 float-right pt-1 hilang" style="text-align: right;">
                <button type="button" id="button-clear" class="btn btn-sm btn-outline-dark flat " style="float: right;">Clear</button>
                <button type="button" id="button-connect" class="btn btn-outline-primary btn-sm flat" style="float: right; margin-right: 3px;">Connection</button>
                <select class="form-control form-select btn-sm flat font-kecil" id="alat" name="alat" style="width: 60% !important; float: right; height: 31px; margin-right: 5px;">
                    <option value="fixedreader">Fixed Reader</option>
                    <!-- <option value="fixedreader">Fixed Reader 4 Ant</option> -->
                    <option value="handheld">Handheld</option>
                </select>
            </div>
        </div>
        <hr class="m-0">
        <div class="row font-kecil mt-1">
            <div class="col-sm-6" >
                <div>
                    <label for="inputEmail3" class="col-sm-2 col-form-label pt-1 font-bold" style="height: 28px; float: left:">INPUT LIST</label>
                    <label id="posex" class="col-sm-10 col-form-label pt-1 text-end text-danger" style="height: 26px; float: right"></label>
                </div>
                <hr class="m-0">
                <div id="tampungan">
                    <!-- <div style="margin-top: 1px;">1. PIC-0881 # 1 dis 1 (09-05-2025 16:00:12)
                        <span class="bg-danger px-2" style="float: right; color: white;">NG</span>
                    </div> -->
                    <!-- <div style="margin-top: 1px;">2. PIC-0881 # 1 dis 1 
                        <span class="bg-success px-2" style="float: right; color: white;">OK</span>
                    </div>
                    <div style="margin-top: 1px;">3. PIC-0881 # 1 dis 1 
                        <span class="bg-success px-2" style="float: right; color: white;">OK</span>
                    </div>
                    <div style="margin-top: 1px;">4. PIC-0881 # 1 dis 1 
                        <span class="bg-success px-2" style="float: right; color: white;">OK</span>
                    </div>
                    <div style="margin-top: 1px;">5. PIC-0881 # 1 dis 1 
                        <span class="bg-success px-2" style="float: right; color: white;">OK</span>
                    </div>
                    <div style="margin-top: 1px;">6. PIC-0881 # 1 dis 1 
                        <span class="bg-success px-2" style="float: right; color: white;">OK</span>
                    </div>
                    <div style="margin-top: 1px;">7. PIC-0881 # 1 dis 1 
                        <span class="bg-success px-2" style="float: right; color: white;">OK</span>
                    </div> -->
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group row hilang" id="inputanrf">
                    <label for="inputEmail3" class="col-sm-2 col-form-label pt-1 font-bold" style="height: 26px;">RFID</label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control input-sm flat p-0" id="inputrfid" oninput="simulateRFIDReading()">
                    </div>
                </div>
                <h5 class="m-0">
                    <div id="jam" style="text-align: right;" class="font-bold text-secondary">-- : -- : --</div>
                </h5>
                <hr class="mt-1">
                <!-- <h5 class="text-primary">7 Record</h5> -->
                 <label class="mb-3 font-bold">Settings :</label>
                 <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label font-kecil">Power Ant</label>
                    <div class="col-sm-6">
                        <select class="form-control form-select flat font-kecil" style="height: 31px;" id="powerSelect">
                            <?php for($x=1; $x<= 30; $x++){ $selek = $x==20 ? '' : ''; ?>
                                <option value="<?= $x; ?>" <?= $selek; ?>><?= $x.' dBM'; ?></option>
                            <?php } ?>
                        </select>
                    </div>
                    <div class="col-sm-4 text-center">
                        <button type="button" id="button-setpower3" class="btn btn-sm btn-outline-success flat hilang" style="width: 40%" >Set</button>
                    </div>
                </div>
                 <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label font-kecil">Ant</label>
                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col-3 mt-2">
                                <div class="form-check">
                                    <input class="form-check-input antenna" type="checkbox" value="1" checked> 
                                    <label class="form-check-label font-bold" for="defaultCheck1">
                                        1
                                    </label>
                                </div>
                            </div>
                            <div class="col-3 mt-2">
                                <div class="form-check">
                                    <input class="form-check-input antenna" type="checkbox" value="2" checked>
                                    <label class="form-check-label font-bold" for="defaultCheck1">
                                        2
                                    </label>
                                </div>
                            </div>
                            <div class="col-3 mt-2">
                                <div class="form-check">
                                    <input class="form-check-input antenna" type="checkbox" value="3" checked>
                                    <label class="form-check-label font-bold" for="defaultCheck1">
                                        3
                                    </label>
                                </div>
                            </div>
                            <div class="col-3 mt-2">
                                <div class="form-check">
                                    <input class="form-check-input antenna" type="checkbox" value="4" checked>
                                    <label class="form-check-label font-bold" for="defaultCheck1">
                                        4
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4 text-center">
                        <button type="button" id="button-ant2" class="btn btn-sm btn-outline-success flat hilang" style="width: 40%">Set</button>
                    </div>
                </div>
                <hr class="m-0">
                <div class="mt-1 text-center">
                    <button type="button" id="button-connect2" class="btn btn-outline-primary btn-sm flat" style="margin-right: 3px;width: 100%;">Connect</button>
                    <button type="button" id="startBtn" class="btn btn-outline-success btn-sm flat hilang" style="margin-right: 3px;">Start</button>
                    <button type="button" id="button-clear2" class="btn btn-sm btn-outline-dark flat hilang">Clear/Stop</button>
                </div>
            </div>
            <!-- <div class="col-sm-6">
                <div class="form-group">
                    <textarea class="form-control flat mt-1" id="exampleFormControlTextarea1" rows="15"></textarea>
                </div>
            </div> -->
        </div>
    </div>
</section>