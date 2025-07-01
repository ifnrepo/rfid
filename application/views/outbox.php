<section class="resume-section p-3" style="align-items : normal !important" id="about">
    <div class="resume-section-content">
        <div class="row">
            <div class="col-sm-6">
                <h3 class="mb-1">INPUT BARANG KE CONTAINER</h3>
                <h5 class="m-0">
                    <div id="jam" style="text-align: left;" class="font-bold text-secondary">-- : -- : --</div>
                </h5>
            </div>
            <div class="col-sm-6 float-right pt-1" style="text-align: right;">
                <select class="form-control form-select btn-sm flat font-kecil" id="alat" name="alat" style="width: 60% !important; float: right; height: 31px; margin-right: 5px;">
                    <option value="fixedreader">Fixed Reader</option>
                    <option value="handheld">Handheld</option>
                </select>
            </div>
        </div>
        <div class="col-sm-6 float-right pt-1" style="text-align: left;">
            <h5>Pilih PO</h5>
            <select class="form-control form-select btn-sm flat font-kecil" id="alat" name="alat" style="width: 60% !important; float: left; height: 31px; margin-right: 5px;">

                <!-- Tp ini harus nge itterate database yang ada -->
                <option value="fixedreader">PO1</option>
                <option value="handheld">PO2</option>
            </select>
        </div>


        <!-- add space  -->    
        <div class="row justify-content-center">
            <div class="col-lg-6">
                <div class="py-3"><!-- empty, adds vertical gap --></div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-lg-6 col-md-8">
                <div class="d-flex align-items-center mb-1">
                    <div class="flex-grow-1 font-bold">INPUT LIST</div>
                    <div class="text-end font-bold" style="width:100px;">STATUS</div>
                </div>
                <hr class="my-1"/>
                <div id="tampungan">
                <!-- content si isi nya ada disini -->
                </div>
            </div>
        </div>

        

    </div>
</section>
